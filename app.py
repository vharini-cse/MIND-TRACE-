
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# REFLECTION API
# =========================================================

@app.route("/api/reflection", methods=["POST"])
def reflection():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No reflection data received."
        }), 400

    situation = data.get("situation", "")
    thought = data.get("thought", "")
    emotion = data.get("emotion", "")
    intensity = data.get("intensity", 5)
    behavior = data.get("behavior", "")
    pattern = data.get("pattern", "")
    alternative_thought = data.get(
        "alternativeThought",
        ""
    )
    reframe = data.get("reframe", "")

    # -----------------------------------------------------
    # Basic response
    # -----------------------------------------------------

    return jsonify({
        "success": True,
        "message": "Reflection received successfully.",
        "reflection": {
            "situation": situation,
            "thought": thought,
            "emotion": emotion,
            "intensity": intensity,
            "behavior": behavior,
            "pattern": pattern,
            "alternativeThought": alternative_thought,
            "reframe": reframe
        }
    })


# =========================================================
# HEALTH CHECK
# Useful when deploying to Render
# =========================================================

@app.route("/health")
def health():

    return jsonify({
        "status": "healthy",
        "application": "MindTrace"
    })


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )

