from flask import Flask,render_template,request,jsonify

from chat import get_response

app=Flask(__name__)

def index_get():
    return render_template("base.html")

@app.get("/")
def index_get():
    return render_template("base.html")

@app.post("/predict")
def predict():
    text=request.get_json().get("message")
    response=get_response(text)#챗봇으로 부터 대답을 받아오는 기능
    message={"answer":response}
    return jsonify(message)

if __name__=="__main__":
    app.run(debug=True)#앱 실행 접근할 수 있도록 해줌.
