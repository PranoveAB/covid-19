'''from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'OK!'

if __name__ == "__main__":
    app.run()

'''
from flask import Flask

import bs4 as bs
from urllib.request import Request, urlopen


req = Request('https://www.worldometers.info/coronavirus/', headers={'User-Agent': 'Mozilla/5.0'})
source = urlopen(req).read()
soup = bs.BeautifulSoup(source,'lxml')


table = soup.table

table_rows = table.find_all('tr')
table_data = table.find_all('td')


def returnData():

    for tr in table_rows:
        td = tr.find_all('td')
        row = [i.text for i in td]
        for data in table_data:
            link = tr.find_all('a')
            rows = [j.text for j in link]
            if (len(rows)>0 and rows[0]=="USA"):
                
                return row[2].replace(',',''), row[3].replace(',',''), row[4].replace(',',''), row[5].replace(',',''),row[6].replace(',','')
                
            break    

#print(tuple(returnData()))

   
app = Flask(__name__)

@app.route("/")    
def index():
    return str(returnData())


if __name__ == '__main__':
    app.run()
