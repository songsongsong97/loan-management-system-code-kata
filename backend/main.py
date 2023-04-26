from extensions import create_app
from views import blueprint

app = create_app()
app.register_blueprint(blueprint)

if __name__ == "__main__":
    app.run(host="0.0.0.0",port="5000",debug=True)
