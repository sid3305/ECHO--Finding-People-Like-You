from sentence_transformers import SentenceTransformer


MODEL_NAME = "all-MiniLM-L6-v2"

model = SentenceTransformer(MODEL_NAME)


def generate_interest_embedding(interests: list[str]) -> list[float]:
    """
    Converts user interests into a numerical embedding.
    Example:
    ["football", "gaming", "anime"]
    """

    if not interests:
        raise ValueError("Interests list cannot be empty.")

    interest_text = " ".join(interests)

    embedding = model.encode(interest_text)

    return embedding.tolist()