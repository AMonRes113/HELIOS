from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json


# ========================================
# HELIOS ENGINE
# ========================================

def calcular_sistema(paneles, potencia_panel, perdidas):
    """
    Calcula la potencia instalada y la potencia útil
    del sistema fotovoltaico.
    """

    potencia_instalada = (paneles * potencia_panel) / 1000

    factor_perdidas = 1 - (perdidas / 100)

    potencia_util = potencia_instalada * factor_perdidas

    return {
        "potencia_instalada": round(potencia_instalada, 2),
        "potencia_util": round(potencia_util, 2)
    }


# ========================================
# API
# ========================================

class HeliosHandler(BaseHTTPRequestHandler):

    def do_GET(self):

        if self.path == "/":
            respuesta = {
                "sistema": "HELIOS",
                "estado": "activo",
                "motor": "Python"
            }

            self.enviar_json(respuesta)
            return


        if self.path.startswith("/simular"):

            try:

                url = urlparse(self.path)
                parametros = parse_qs(url.query)

                paneles = int(
                    parametros.get("paneles", [120])[0]
                )

                potencia_panel = float(
                    parametros.get("potencia", [550])[0]
                )

                perdidas = float(
                    parametros.get("perdidas", [14])[0]
                )


                if paneles <= 0:
                    raise ValueError(
                        "El número de paneles debe ser mayor que cero."
                    )


                if potencia_panel <= 0:
                    raise ValueError(
                        "La potencia del panel debe ser mayor que cero."
                    )


                if perdidas < 0 or perdidas > 100:
                    raise ValueError(
                        "Las pérdidas deben estar entre 0 y 100%."
                    )


                resultado = calcular_sistema(
                    paneles,
                    potencia_panel,
                    perdidas
                )


                self.enviar_json(resultado)
                return


            except (ValueError, TypeError) as error:

                self.enviar_json({
                    "error": str(error)
                }, 400)

                return


        self.enviar_json({
            "error": "Ruta no encontrada"
        }, 404)


    def enviar_json(self, datos, codigo=200):

        contenido = json.dumps(datos).encode("utf-8")


        self.send_response(codigo)


        # ========================================
        # CORS
        # Permite que index.html pueda comunicarse
        # con el backend aunque se abra localmente.
        # ========================================

        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )

        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        )

        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )


        self.send_header(
            "Content-Type",
            "application/json"
        )

        self.send_header(
            "Content-Length",
            str(len(contenido))
        )

        self.end_headers()

        self.wfile.write(contenido)


# ========================================
# SERVIDOR
# ========================================

servidor = HTTPServer(
    ("localhost", 8000),
    HeliosHandler
)


print(
    "HELIOS Backend activo en "
    "http://localhost:8000"
)


servidor.serve_forever()