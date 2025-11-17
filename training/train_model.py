import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, Input
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from PIL import Image

# ----------------------------
# 1️⃣ Configuración rutas y parámetros
# ----------------------------
TRAIN_PATH = r"C:\Users\USER\Documents\Proyectos_Programacion\DataScience\Brain_Tumor_MRI\database\Training"
TEST_PATH  = r"C:\Users\USER\Documents\Proyectos_Programacion\DataScience\Brain_Tumor_MRI\database\Testing"
MODEL_PATH = "models/brain_tumor_model_efficientnet.keras"

os.makedirs("models", exist_ok=True)

IMG_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS = 30  # Entrenamiento inicial más largo
FINE_TUNE_EPOCHS = 15  # Fine-tuning
CLASS_NAMES = ["notumor", "glioma", "meningioma", "pituitary"]

# ----------------------------
# 2️⃣ Crear DataFrame
# ----------------------------
def create_df(base_path):
    data = []
    for label in os.listdir(base_path):
        folder = os.path.join(base_path, label)
        if os.path.isdir(folder):
            for fname in os.listdir(folder):
                path = os.path.join(folder, fname)
                data.append([path, label])
    df = pd.DataFrame(data, columns=["path", "label"])
    return df

# ----------------------------
# 3️⃣ Validación imágenes MRI
# ----------------------------
def is_mri(image_path):
    try:
        img = Image.open(image_path).convert("L")
        arr = np.array(img)
        return arr.mean() < 150
    except:
        return False

def filter_valid_images(df):
    df = df[df['path'].apply(is_mri)]
    return df.reset_index(drop=True)

train_df = filter_valid_images(create_df(TRAIN_PATH))
test_df  = filter_valid_images(create_df(TEST_PATH))
valid_df, test_df = train_test_split(test_df, train_size=0.5, random_state=42, stratify=test_df['label'])

print(f"Train: {len(train_df)}, Valid: {len(valid_df)}, Test: {len(test_df)}")

# ----------------------------
# 3.5️⃣ Pesos de clase para balancear entrenamiento
# ----------------------------
class_weights_values = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(train_df['label']),
    y=train_df['label']
)
class_weights = dict(zip(np.unique(train_df['label']), class_weights_values))
print("Pesos de clase:", class_weights)

# ----------------------------
# 4️⃣ Generadores con Data Augmentation
# ----------------------------
train_gen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.1,
    horizontal_flip=True,
    fill_mode='nearest'
)
valid_gen = ImageDataGenerator(rescale=1./255)
test_gen  = ImageDataGenerator(rescale=1./255)

train_flow = train_gen.flow_from_dataframe(train_df, x_col="path", y_col="label",
                                           target_size=IMG_SIZE, batch_size=BATCH_SIZE,
                                           class_mode='categorical', shuffle=True)
valid_flow = valid_gen.flow_from_dataframe(valid_df, x_col="path", y_col="label",
                                           target_size=IMG_SIZE, batch_size=BATCH_SIZE,
                                           class_mode='categorical', shuffle=False)
test_flow = test_gen.flow_from_dataframe(test_df, x_col="path", y_col="label",
                                         target_size=IMG_SIZE, batch_size=BATCH_SIZE,
                                         class_mode='categorical', shuffle=False)

# ----------------------------
# 5️⃣ Modelo EfficientNetB0
# ----------------------------
base_model = tf.keras.applications.EfficientNetB0(
    weights='imagenet', include_top=False,
    input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)
)
base_model.trainable = False

inputs = Input(shape=(IMG_SIZE[0], IMG_SIZE[1], 3))
x = base_model(inputs, training=False)
x = GlobalAveragePooling2D()(x)
x = Dropout(0.4)(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)
outputs = Dense(len(CLASS_NAMES), activation='softmax')(x)

model = Model(inputs, outputs)
model.compile(optimizer=Adam(1e-3),
              loss='categorical_crossentropy',
              metrics=['accuracy',
                       tf.keras.metrics.Precision(name='precision'),
                       tf.keras.metrics.Recall(name='recall')])
model.summary()

# ----------------------------
# 6️⃣ Callbacks
# ----------------------------
early_stop = EarlyStopping(monitor='val_accuracy', patience=7, restore_best_weights=True, verbose=1)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, min_lr=1e-6, verbose=1)
checkpoint = ModelCheckpoint(MODEL_PATH, monitor='val_accuracy', save_best_only=True, verbose=1)

# ----------------------------
# 7️⃣ Entrenamiento inicial
# ----------------------------
history = model.fit(
    train_flow,
    validation_data=valid_flow,
    epochs=EPOCHS,
    class_weight=class_weights,
    callbacks=[early_stop, reduce_lr, checkpoint]
)

# ----------------------------
# 8️⃣ Fine-tuning últimas capas
# ----------------------------
print("🔥 Fine-tuning últimas capas EfficientNetB0...")
for layer in base_model.layers[:-30]:
    layer.trainable = False
for layer in base_model.layers[-30:]:
    layer.trainable = True

model.compile(optimizer=Adam(1e-4),
              loss='categorical_crossentropy',
              metrics=['accuracy',
                       tf.keras.metrics.Precision(name='precision'),
                       tf.keras.metrics.Recall(name='recall')])

fine_tune_history = model.fit(
    train_flow,
    validation_data=valid_flow,
    epochs=FINE_TUNE_EPOCHS,
    class_weight=class_weights,
    callbacks=[early_stop, reduce_lr, checkpoint]
)

# ----------------------------
# 9️⃣ Graficar métricas
# ----------------------------
def plot_metrics(histories, titles):
    plt.figure(figsize=(18,6))
    plt.subplot(1,3,1)
    for h, t in zip(histories, titles):
        plt.plot(h.history['accuracy'], label=f'{t} train')
        plt.plot(h.history['val_accuracy'], label=f'{t} val')
    plt.title('Accuracy'); plt.xlabel('Epoch'); plt.ylabel('Accuracy'); plt.legend()
    
    plt.subplot(1,3,2)
    for h, t in zip(histories, titles):
        plt.plot(h.history['loss'], label=f'{t} train')
        plt.plot(h.history['val_loss'], label=f'{t} val')
    plt.title('Loss'); plt.xlabel('Epoch'); plt.ylabel('Loss'); plt.legend()
    
    plt.subplot(1,3,3)
    for h, t in zip(histories, titles):
        plt.plot(h.history['precision'], label=f'{t} precision')
        plt.plot(h.history['recall'], label=f'{t} recall')
    plt.title('Precision & Recall'); plt.xlabel('Epoch'); plt.ylabel('Value'); plt.legend()
    
    plt.tight_layout()
    plt.show()

plot_metrics([history, fine_tune_history], ['base', 'fine-tune'])
print(f"✅ Modelo entrenado y guardado en: {MODEL_PATH}")
