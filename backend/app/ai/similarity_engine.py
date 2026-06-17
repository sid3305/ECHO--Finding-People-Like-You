import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def calculate_interest_similarity(
    user_embedding: list[float],
    other_user_embedding: list[float]
) -> float:
    """
    Calculates cosine similarity between two users' interest embeddings.

    Returns a score between 0 and 1.
    Higher score means more similar interests.
    """

    if not user_embedding or not other_user_embedding:
        raise ValueError("Embeddings cannot be empty.")

    user_vector = np.array(user_embedding).reshape(1, -1)
    other_user_vector = np.array(other_user_embedding).reshape(1, -1)

    similarity = cosine_similarity(user_vector, other_user_vector)[0][0]

    return round(float(similarity), 4)