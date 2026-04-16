from flask import Flask, render_template, request, redirect, flash, session

app = Flask(__name__)
app.secret_key = "secret123"

# In-memory database
events = [
    {"id": 1, "name": "Music Concert", "date": "2026-05-10", "venue": "Mumbai", "rsvp": 0},
    {"id": 2, "name": "Tech Conference", "date": "2026-06-15", "venue": "Pune", "rsvp": 0},
    {"id": 3, "name": "Art Exhibition", "date": "2026-04-20", "venue": "Delhi", "rsvp": 0},
    {"id": 4, "name": "Startup Meetup", "date": "2026-07-05", "venue": "Bangalore", "rsvp": 0},
]

# ---------------- ROUTES ---------------- #

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/events")
def events_page():
    return render_template("events.html", events=events)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        event_name = request.form["event"]

        for event in events:
            if event["name"] == event_name:
                event["rsvp"] += 1

        flash("Registration Successful!", "success")
        return redirect("/events")

    return render_template("register.html", events=events)

# ---------------- ADMIN ---------------- #

@app.route("/admin")
def admin():
    if not session.get("admin"):
        session["admin"] = True  # simple login bypass
    return render_template("admin.html", events=events)

@app.route("/admin/add", methods=["POST"])
def add_event():
    new_event = {
        "id": len(events) + 1,
        "name": request.form["name"],
        "date": request.form["date"],
        "venue": request.form["venue"],
        "rsvp": 0
    }
    events.append(new_event)
    flash("Event Added!", "success")
    return redirect("/admin")

@app.route("/admin/delete/<int:id>")
def delete_event(id):
    global events
    events = [e for e in events if e["id"] != id]
    flash("Event Deleted!", "danger")
    return redirect("/admin")

# ------------------------------------------------ #

if __name__ == "__main__":
    app.run(debug=True)