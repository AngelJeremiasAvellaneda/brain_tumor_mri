# Backend - BrainTumorDetector

Este backend utiliza Flask para exponer un endpoint `/predict` que recibe una
imagen de resonancia magnética (MRI), la valida, la preprocesa y usa un modelo
EfficientNet pre-entrenado para clasificar el tipo de tumor cerebral.
