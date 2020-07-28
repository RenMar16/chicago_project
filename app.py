# import Flask, other dependencies
from flask import Flask, jsonify, render_template
import numpy as np
import sqlalchemy as DB
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
import datetime as dt
import pandas as pd
from dateutil.relativedelta import relativedelta
import datetime as dt
import json
import pandas as pd

engine = create_engine("sqlite:///data/chicago_data.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

session = Session(engine)
app = Flask(__name__)

@app.route("/")
def index():
    '''Return homepage'''
    return render_template("index.html")

@app.route("/neighborhoods")
def neighborhood():
    '''Return Neighborhood Charts page'''
    return render_template("neighborhood_charts.html")

@app.route("/causes")
def causes():
    '''Return Causes of Death Charts page'''
    return render_template("death_charts.html")

@app.route("/API/Chi_Death_Data")
def death_data():
    death_data = engine.execute('select * from chicago_data').fetchall() 
    session.close()
    chi_data = [] 
    for cause_of_death, comm_area, comm_area_name, cumul_deaths, cumul_deaths_rank, avg_ann_deaths, avg_crd_rt, avg_crd_rt_lower, avg_crd_rt_upper, crd_rt_rnk, avg_adj_rt, avg_adj_rt_lower, avg_adj_rt_upper, adj_rt_rnk, avg_YPLL, YPLL_rt_rnk, wrn in death_data:
        chi= {}
        chi['CauseofDeath']=cause_of_death
        chi['Community Area']=comm_area
        chi['CommunityAreaName']=comm_area_name
        chi['CumulativeDeaths20062010']=cumul_deaths
        chi['AverageAnnualDeaths']=avg_ann_deaths
        chi['CumulativeDeathsRank']=cumul_deaths_rank
        chi['Average Crude Rate 2006 - 2010']=avg_crd_rt
        chi['Average Crude Rate Lower CI']=avg_crd_rt_lower
        chi['Average Crude Rate Upper CI']=avg_crd_rt_upper
        chi['Crude Rate Rank']=crd_rt_rnk
        chi['Average Adjusted Rate 2006 - 2010']=avg_adj_rt
        chi['Average Adjusted Rate Lower CI']=avg_adj_rt_lower
        chi['Average Adjusted Rate Upper CI']=avg_adj_rt_upper
        chi['AdjustedRateRank']=adj_rt_rnk
        chi['AverageAnnualYearsofPotentialLifeLost']=avg_YPLL
        chi['YPLLRateRANK']=YPLL_rt_rnk
        chi['WARNING']=wrn
        chi_data.append(chi)
    #Return a Json Dictionary
    return jsonify(chi_data)





if __name__ == "__main__":
    app.run(debug=True)
