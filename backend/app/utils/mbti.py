from app.data.mbti_questions import MBTI_QUESTIONS


def calculate_mbti(answers):

    scores = {
        "E": 0,
        "I": 0,
        "S": 0,
        "N": 0,
        "T": 0,
        "F": 0,
        "J": 0,
        "P": 0
    }

    question_map = {
        q["id"]: q
        for q in MBTI_QUESTIONS
    }

    for answer in answers:

        question = question_map.get(
            answer.question_id
        )

        if not question:
            continue

        value = answer.value

        if value < 1 or value > 5:
            continue

        trait = question["direction"]

        scores[trait] += value

    mbti_type = ""

    mbti_type += (
        "E"
        if scores["E"] >= scores["I"]
        else "I"
    )

    mbti_type += (
        "S"
        if scores["S"] >= scores["N"]
        else "N"
    )

    mbti_type += (
        "T"
        if scores["T"] >= scores["F"]
        else "F"
    )

    mbti_type += (
        "J"
        if scores["J"] >= scores["P"]
        else "P"
    )

    return {
    "mbti_type": mbti_type,
    "scores": scores
}

def calculate_confidence(scores):

    confidence = {}

    confidence["EI"] = round(
        max(scores["E"], scores["I"])
        / (scores["E"] + scores["I"])
        * 100
    )

    confidence["SN"] = round(
        max(scores["S"], scores["N"])
        / (scores["S"] + scores["N"])
        * 100
    )

    confidence["TF"] = round(
        max(scores["T"], scores["F"])
        / (scores["T"] + scores["F"])
        * 100
    )

    confidence["JP"] = round(
        max(scores["J"], scores["P"])
        / (scores["J"] + scores["P"])
        * 100
    )

    return confidence

def needs_tiebreaker(scores):

    return {
        "EI": abs(scores["E"] - scores["I"]) <= 2,
        "SN": abs(scores["S"] - scores["N"]) <= 2,
        "TF": abs(scores["T"] - scores["F"]) <= 2,
        "JP": abs(scores["J"] - scores["P"]) <= 2
    }