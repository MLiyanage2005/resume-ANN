# =========================================================
# predictor.py
# =========================================================
#
# FULL INFERENCE PIPELINE
# for AI Resume Matching System
#
# Pipeline:
#   uploaded resume file (PDF / DOCX)
#   → text extraction     (document_loader.py)
#   → text cleaning        (cleaner.py)
#   → transformer embedding (all-MiniLM-L6-v2)
#   → ANN model prediction (ann_model.h5)
#   → top-k role predictions with confidence scores
#
# This module does NOT modify the model architecture,
# the embedding model, or the preprocessing pipeline.
# It uses everything exactly as trained.
#
# =========================================================



# =========================================================
# IMPORTS
# =========================================================

# ---------------------------------------------------------
# STANDARD LIBRARIES
# ---------------------------------------------------------

import os
import sys
import pickle
import numpy as np


# ---------------------------------------------------------
# PATH SETUP
# ---------------------------------------------------------
#
# Why sys.path manipulation?
#
# predictor.py lives at:
#   ml_service/src/inference/predictor.py
#
# But it needs to import from:
#   ml_service/src/utils/document_loader.py
#   ml_service/src/preprocessing/cleaner.py
#
# By adding the project root to sys.path,
# we can use clean absolute-style imports
# that work both when running standalone
# and when called from other modules.
#
# ---------------------------------------------------------

# Get the directory where THIS file lives
# → ml_service/src/inference/

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Go up 3 levels to reach project root
# inference/ → src/ → ml_service/ → project root

PROJECT_ROOT = os.path.abspath(
    os.path.join(CURRENT_DIR, "..", "..", "..")
)

# Add project root to Python's module search path

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)


# ---------------------------------------------------------
# INTERNAL MODULE IMPORTS
# ---------------------------------------------------------
#
# These are YOUR existing modules.
# They are used exactly as you wrote them.
# No modifications made.
#
# ---------------------------------------------------------

# extract_resume_text(file_path)
# → auto-detects PDF/DOCX
# → returns raw text string

from ml_service.src.utils.document_loader import extract_resume_text


# clean_resume(text)
# → lowercase, remove URLs, emails, non-alpha chars
# → returns cleaned text string

from ml_service.src.preprocessing.cleaner import clean_resume


# ---------------------------------------------------------
# TENSORFLOW / KERAS
# ---------------------------------------------------------
#
# load_model is used to load ann_model.h5
#
# Your model architecture (unchanged):
#   Sequential:
#     Dense(256, activation='relu')   ← input: 384 dims
#     Dense(128, activation='relu')
#     Dense(25,  activation='softmax') ← output: 25 classes
#
# ---------------------------------------------------------

from tensorflow.keras.models import load_model


# ---------------------------------------------------------
# SENTENCE TRANSFORMERS
# ---------------------------------------------------------
#
# SentenceTransformer loads the pre-trained
# all-MiniLM-L6-v2 transformer model.
#
# This model converts any text into a
# 384-dimensional dense vector (embedding).
#
# This is the SAME model used during training
# to generate embeddings.npy (962, 384).
#
# ---------------------------------------------------------

from sentence_transformers import SentenceTransformer



# =========================================================
# CONFIGURATION
# =========================================================
#
# All paths are relative to the project root.
# These match your existing saved_models/ directory.
#
# =========================================================

# ---------------------------------------------------------
# MODEL FILE PATHS
# ---------------------------------------------------------

# Trained ANN model
# Architecture: 384 → 256 → 128 → 25

MODEL_PATH = os.path.join(
    PROJECT_ROOT,
    "ml_service", "saved_models", "ann_model.h5"
)

# Fitted sklearn LabelEncoder
# Maps integer predictions (0-24) back to
# human-readable role names like "Data Science"

LABEL_ENCODER_PATH = os.path.join(
    PROJECT_ROOT,
    "ml_service", "saved_models", "label_encoder.pkl"
)

# Transformer model name
# Must match what was used during training

TRANSFORMER_NAME = "sentence-transformers/all-MiniLM-L6-v2"



# =========================================================
# MODEL LOADING FUNCTIONS
# =========================================================
#
# Why separate loading functions?
#
# 1. REUSABILITY:
#    Each loader can be called independently
#    if you only need one component.
#
# 2. ERROR ISOLATION:
#    If a model file is missing or corrupted,
#    the error is caught at the specific loader
#    rather than crashing the entire pipeline.
#
# 3. LAZY LOADING:
#    Models are loaded only when needed,
#    not at module import time.
#
# =========================================================


def load_ann_model(model_path=MODEL_PATH):

    """
    Load the trained ANN (Artificial Neural Network) model.

    The model was trained using TensorFlow/Keras
    and saved as an HDF5 (.h5) file.

    Architecture:
        Input:  384 features (from transformer embedding)
        Dense:  256 neurons, ReLU activation
        Dense:  128 neurons, ReLU activation
        Output: 25 neurons, Softmax activation

    Parameters:
    -----------
    model_path : str
        Path to the saved .h5 model file.

    Returns:
    --------
    tensorflow.keras.Model
        The loaded Keras model ready for prediction.

    Raises:
    -------
    FileNotFoundError
        If the model file does not exist.
    RuntimeError
        If the model fails to load.
    """

    # ---------------------------------------------------------
    # CHECK FILE EXISTS
    # ---------------------------------------------------------

    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"ANN model file not found at: {model_path}"
        )

    # ---------------------------------------------------------
    # LOAD AND RETURN MODEL
    # ---------------------------------------------------------
    #
    # load_model() reconstructs the model architecture,
    # weights, and optimizer state from the .h5 file.
    #
    # ---------------------------------------------------------

    try:
        model = load_model(model_path)
        print(f"[OK] ANN model loaded from: {model_path}")
        return model

    except Exception as e:
        raise RuntimeError(
            f"Failed to load ANN model: {str(e)}"
        )



def load_label_encoder(encoder_path=LABEL_ENCODER_PATH):

    """
    Load the fitted LabelEncoder.

    The LabelEncoder was fitted during training
    to map job role names to integer labels.

    Example mapping:
        0  → 'Advocate'
        6  → 'Data Science'
        20 → 'Python Developer'

    At inference time, we use inverse_transform()
    to convert predicted integers back to role names.

    Parameters:
    -----------
    encoder_path : str
        Path to the saved .pkl file.

    Returns:
    --------
    sklearn.preprocessing.LabelEncoder
        The fitted label encoder.

    Raises:
    -------
    FileNotFoundError
        If the encoder file does not exist.
    RuntimeError
        If the encoder fails to load.
    """

    # ---------------------------------------------------------
    # CHECK FILE EXISTS
    # ---------------------------------------------------------

    if not os.path.exists(encoder_path):
        raise FileNotFoundError(
            f"Label encoder file not found at: {encoder_path}"
        )

    # ---------------------------------------------------------
    # LOAD AND RETURN ENCODER
    # ---------------------------------------------------------
    #
    # pickle.load() deserializes the LabelEncoder object
    # that was saved with pickle.dump() during training.
    #
    # ---------------------------------------------------------

    try:
        with open(encoder_path, "rb") as f:
            label_encoder = pickle.load(f)

        print(f"[OK] Label encoder loaded from: {encoder_path}")
        print(f"    Classes: {list(label_encoder.classes_)}")
        return label_encoder

    except Exception as e:
        raise RuntimeError(
            f"Failed to load label encoder: {str(e)}"
        )



def load_embedding_model(model_name=TRANSFORMER_NAME):

    """
    Load the sentence-transformers embedding model.

    Model: all-MiniLM-L6-v2
    Output: 384-dimensional dense vector per input text

    Why this specific model?
    - It was used during training to generate
      the embeddings.npy file (962 samples × 384 dims).
    - Using a DIFFERENT model at inference time would
      produce different embeddings, making the ANN
      predictions meaningless.

    Parameters:
    -----------
    model_name : str
        HuggingFace model identifier.

    Returns:
    --------
    SentenceTransformer
        The loaded transformer model.

    Raises:
    -------
    RuntimeError
        If the model fails to load.
    """

    # ---------------------------------------------------------
    # LOAD AND RETURN TRANSFORMER
    # ---------------------------------------------------------
    #
    # SentenceTransformer() downloads the model on first use
    # and caches it locally for subsequent calls.
    #
    # ---------------------------------------------------------

    try:
        embedding_model = SentenceTransformer(model_name)
        print(f"[OK] Embedding model loaded: {model_name}")
        return embedding_model

    except Exception as e:
        raise RuntimeError(
            f"Failed to load embedding model: {str(e)}"
        )



# =========================================================
# EMBEDDING GENERATION
# =========================================================

def generate_embedding(text, embedding_model):

    """
    Convert cleaned resume text into a numerical
    embedding vector using the transformer model.

    How it works:
    1. The transformer tokenizes the input text.
    2. It passes tokens through 6 transformer layers
       (MiniLM architecture).
    3. It pools the output into a single 384-dim vector
       that captures the semantic meaning of the text.

    Why embeddings?
    - Raw text cannot be fed into a neural network.
    - Embeddings convert text into dense numerical
      representations that preserve semantic similarity.
    - "Python developer with ML experience" will produce
      an embedding close to "Data Science" training samples.

    Parameters:
    -----------
    text : str
        Cleaned resume text.
    embedding_model : SentenceTransformer
        The loaded transformer model.

    Returns:
    --------
    numpy.ndarray
        Shape (1, 384) — a single embedding vector
        reshaped for model.predict() input.
    """

    # ---------------------------------------------------------
    # ENCODE TEXT TO EMBEDDING
    # ---------------------------------------------------------
    #
    # .encode() returns a 1D array of shape (384,)
    # We reshape to (1, 384) because model.predict()
    # expects a batch dimension.
    #
    # ---------------------------------------------------------

    embedding = embedding_model.encode(text)

    # Reshape from (384,) to (1, 384)
    # The ANN expects input shape (batch_size, 384)

    embedding = np.array(embedding).reshape(1, -1)

    return embedding



# =========================================================
# TOP-K PREDICTION EXTRACTION
# =========================================================

def get_top_predictions(probabilities, label_encoder, top_k=5):

    """
    Extract the top-k most likely job roles
    from the model's probability output.

    How probabilities work:
    - The ANN's final layer uses softmax activation.
    - Softmax converts raw logits into probabilities
      that sum to 1.0 across all 25 classes.
    - Example output: [0.01, 0.02, ..., 0.88, ..., 0.01]
      where each value is P(class_i | resume).

    Why argmax / argsort for top-k?
    - np.argsort() sorts indices by ascending value.
    - We reverse with [::-1] to get descending order.
    - We take the first top_k indices.
    - These indices map to class labels via the
      label encoder's inverse_transform().

    Parameters:
    -----------
    probabilities : numpy.ndarray
        Shape (1, 25) — softmax output from the ANN.
    label_encoder : sklearn.preprocessing.LabelEncoder
        Fitted encoder to map indices → role names.
    top_k : int
        Number of top predictions to return.

    Returns:
    --------
    list of dict
        Each dict contains:
        - "role": str (human-readable job role name)
        - "confidence": float (probability score, 0.0 to 1.0)

        Sorted by confidence in descending order.
    """

    # ---------------------------------------------------------
    # FLATTEN PROBABILITIES
    # ---------------------------------------------------------
    #
    # model.predict() returns shape (1, 25).
    # We flatten to (25,) for easier indexing.
    #
    # ---------------------------------------------------------

    probs = probabilities.flatten()

    # ---------------------------------------------------------
    # GET SORTED INDICES (DESCENDING)
    # ---------------------------------------------------------
    #
    # np.argsort() returns indices that would sort the array
    # in ascending order. We reverse with [::-1] to get
    # the highest probabilities first.
    #
    # Example:
    #   probs = [0.1, 0.88, 0.02]
    #   argsort = [2, 0, 1]       ← ascending
    #   reversed = [1, 0, 2]      ← descending
    #   top_k=2 → [1, 0]          ← indices of top 2
    #
    # ---------------------------------------------------------

    top_indices = np.argsort(probs)[::-1][:top_k]

    # ---------------------------------------------------------
    # MAP INDICES TO ROLE NAMES
    # ---------------------------------------------------------
    #
    # label_encoder.inverse_transform() converts
    # integer labels back to the original string names.
    #
    # Example:
    #   index 6 → "Data Science"
    #   index 20 → "Python Developer"
    #
    # ---------------------------------------------------------

    top_labels = label_encoder.inverse_transform(top_indices)

    # ---------------------------------------------------------
    # BUILD RESULTS LIST
    # ---------------------------------------------------------

    top_predictions = []

    for i in range(len(top_indices)):

        prediction = {
            "role": top_labels[i],
            "confidence": round(float(probs[top_indices[i]]), 4)
        }

        top_predictions.append(prediction)

    return top_predictions



# =========================================================
# MAIN PREDICTION FUNCTION
# =========================================================

def predict_resume(file_path, top_k=5):

    """
    MAIN ENTRY POINT — Full inference pipeline.

    Takes a resume file (PDF or DOCX) and returns
    the top-k predicted job roles with confidence scores.

    Complete pipeline:
        Step 1: Extract raw text from file
        Step 2: Clean the extracted text
        Step 3: Generate transformer embedding (384-dim)
        Step 4: Feed embedding into ANN model
        Step 5: Extract top-k predictions from softmax output
        Step 6: Return structured result dictionary

    Parameters:
    -----------
    file_path : str
        Absolute or relative path to the resume file.
        Supported formats: PDF, DOCX.
    top_k : int
        Number of top predictions to return.
        Default is 5.

    Returns:
    --------
    dict
        {
            "cleaned_text": str,
            "top_predictions": [
                {"role": "Data Science", "confidence": 0.88},
                {"role": "Python Developer", "confidence": 0.09},
                ...
            ]
        }

    Raises:
    -------
    FileNotFoundError
        If the resume file does not exist.
    ValueError
        If the file format is not PDF or DOCX.
    RuntimeError
        If any model fails to load.
    """

    # =========================================================
    # STEP 0: VALIDATE INPUT FILE
    # =========================================================

    if not os.path.exists(file_path):
        raise FileNotFoundError(
            f"Resume file not found: {file_path}"
        )

    print(f"\n{'='*60}")
    print(f"  RESUME PREDICTION PIPELINE")
    print(f"{'='*60}")
    print(f"  File: {file_path}")
    print(f"  Top-K: {top_k}")
    print(f"{'='*60}\n")


    # =========================================================
    # STEP 1: EXTRACT RAW TEXT
    # =========================================================
    #
    # Uses YOUR document_loader.py
    # extract_resume_text() auto-detects PDF vs DOCX
    # and returns the full raw text.
    #
    # =========================================================

    print("[Step 1/5] Extracting text from resume...")

    raw_text = extract_resume_text(file_path)

    # Validate that text was actually extracted

    if not raw_text or raw_text.strip() == "":
        raise ValueError(
            "No text could be extracted from the resume. "
            "The file may be empty or image-based."
        )

    print(f"  → Extracted {len(raw_text)} characters")


    # =========================================================
    # STEP 2: CLEAN TEXT
    # =========================================================
    #
    # Uses YOUR cleaner.py
    # clean_resume() pipeline:
    #   lowercase → remove URLs → remove emails
    #   → remove non-alpha → collapse whitespace → strip
    #
    # This is the EXACT same cleaning applied during training.
    # Using a different cleaning method would produce
    # different embeddings and wrong predictions.
    #
    # =========================================================

    print("[Step 2/5] Cleaning extracted text...")

    cleaned_text = clean_resume(raw_text)

    if not cleaned_text or cleaned_text.strip() == "":
        raise ValueError(
            "Text became empty after cleaning. "
            "The resume may contain only URLs/emails/numbers."
        )

    print(f"  → Cleaned text: {len(cleaned_text)} characters")
    print(f"  → Preview: {cleaned_text[:100]}...")


    # =========================================================
    # STEP 3: GENERATE EMBEDDING
    # =========================================================
    #
    # Converts cleaned text → 384-dimensional vector
    # using all-MiniLM-L6-v2 (same as training).
    #
    # The embedding captures the semantic meaning
    # of the resume in a format the ANN understands.
    #
    # =========================================================

    print("[Step 3/5] Generating transformer embedding...")

    embedding_model = load_embedding_model()
    embedding = generate_embedding(cleaned_text, embedding_model)

    print(f"  → Embedding shape: {embedding.shape}")


    # =========================================================
    # STEP 4: ANN PREDICTION
    # =========================================================
    #
    # Feed the (1, 384) embedding into the ANN.
    #
    # The model outputs (1, 25) probabilities via softmax.
    # Each value represents P(role_i | resume_embedding).
    #
    # Example output:
    #   [[0.01, 0.02, 0.88, 0.03, ..., 0.01]]
    #   → 88% chance this resume matches class index 2
    #
    # =========================================================

    print("[Step 4/5] Running ANN prediction...")

    ann_model = load_ann_model()
    probabilities = ann_model.predict(embedding)

    print(f"  → Probabilities shape: {probabilities.shape}")
    print(f"  → Max confidence: {np.max(probabilities):.4f}")


    # =========================================================
    # STEP 5: EXTRACT TOP-K PREDICTIONS
    # =========================================================
    #
    # Convert raw probabilities into human-readable
    # role names with confidence scores.
    #
    # =========================================================

    print("[Step 5/5] Extracting top predictions...")

    label_encoder = load_label_encoder()
    top_predictions = get_top_predictions(
        probabilities, label_encoder, top_k
    )


    # =========================================================
    # BUILD RESULT DICTIONARY
    # =========================================================

    result = {
        "cleaned_text": cleaned_text,
        "top_predictions": top_predictions
    }


    # =========================================================
    # PRINT RESULTS
    # =========================================================

    print(f"\n{'='*60}")
    print(f"  PREDICTION RESULTS")
    print(f"{'='*60}")

    for i, pred in enumerate(top_predictions, 1):
        confidence_bar = "#" * int(pred["confidence"] * 30)
        print(
            f"  {i}. {pred['role']:<30} "
            f"{pred['confidence']:.4f} {confidence_bar}"
        )

    print(f"{'='*60}\n")

    return result



# =========================================================
# OPTIONAL TESTING BLOCK
# =========================================================
#
# Run this file directly to test the full pipeline:
#   python predictor.py
#
# Make sure to place a sample resume at the path below,
# or change the path to point to your test resume.
#
# =========================================================

if __name__ == "__main__":

    # ---------------------------------------------------------
    # SET TEST RESUME PATH
    # ---------------------------------------------------------
    #
    # Change this path to point to an actual resume file
    # on your system for testing.
    #
    # ---------------------------------------------------------

    test_resume_path = os.path.join(
        PROJECT_ROOT,
        "ml_service", "uploads", "sample_resume.pdf"
    )

    # ---------------------------------------------------------
    # RUN PREDICTION
    # ---------------------------------------------------------

    try:

        result = predict_resume(
            file_path=test_resume_path,
            top_k=5
        )

        # Print the full result dictionary
        print("\n[FULL RESULT DICTIONARY]")
        print(f"Cleaned text length: {len(result['cleaned_text'])}")
        print(f"Top predictions:")

        for pred in result["top_predictions"]:
            print(f"  - {pred['role']}: {pred['confidence']}")

    except FileNotFoundError as e:
        print(f"\n[ERROR] File not found: {e}")
        print("Please place a sample resume in the uploads/ folder.")

    except ValueError as e:
        print(f"\n[ERROR] Value error: {e}")

    except RuntimeError as e:
        print(f"\n[ERROR] Runtime error: {e}")

    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {e}")
