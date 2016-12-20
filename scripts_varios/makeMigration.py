from django import *
print("leyendo archivo fuente: [paraderos.txt] ...");
file =open('paraderos.txt','r');
database_name='transvaldivia'
app_name="principal"
table_name="paradero"
sql='use {0};\n'.format(database_name);
sql+='delete from {0};\n'.format(app_name+"_"+table_name);
for line in file:
	place=str.replace(line,'\n','');
	place=place.split(';')
	sql+="INSERT INTO {0} ".format(app_name+"_"+table_name)
	sql+="(google_id,nombre,pos) VALUES ('{0}','{1}','{2}');\n".format(place[0],place[1],place[2]+","+place[3])
file.close()

output = open("output.sql", "w")
output.write(sql);
output.close();
print sql

