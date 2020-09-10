import random
import requests



#Pidiendo acronym
acronym = raw_input("Ingresa un acronimo:")

#Pidiendo un token de prueba
print "Obteniendo token..."
r = requests.get("http://localhost:3002/token")
result = r.json()
print "Resultado de la operacion:"
print r.text


#Editando el dato
print "Actualizando un dato"
r_update = requests.delete("http://localhost:3002/acronym/{0}".format(acronym), 
    headers={'Authorization': 'Bearer {0}'.format(result["token"])})

print "Resultado de la operacion"
print r_update.text