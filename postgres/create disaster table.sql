DROP TABLE IF EXISTS ica_costs;
CREATE TABLE ica_costs
(
  id integer NOT NULL,
  insured_cost money NULL,
  normalised_cost_2011 money NULL,
  CONSTRAINT ica_costs_pkey PRIMARY KEY (id)
)
WITH (OIDS=FALSE);
ALTER TABLE ica_costs OWNER TO postgres;

COPY ica_costs FROM 'C:\minus34\GitHub\Project-Doom\data/ICA Data.csv' HEADER QUOTE '"' CSV;


DROP TABLE IF EXISTS temp_aemkh_disasters;
CREATE TABLE temp_aemkh_disasters
(
  id integer NOT NULL,
  type character varying(50) NOT NULL,
  sub_type character varying(50) NOT NULL,
  name character varying(255) NOT NULL,
  description character varying(7500) NOT NULL,
  start_date character varying(50) NOT NULL,
  end_date character varying(50) NOT NULL,
  lat numeric(10,8) NOT NULL,
  long numeric(11,8) NOT NULL,
  evacuated integer NULL,
  homeless integer NULL,
  injuries integer NULL,
  deaths integer NULL,
  insured_cost money NULL,
  homes_damaged integer NULL,
  homes_destroyed integer NULL,
  regions character varying(50) NOT NULL,
  url character varying(255) NOT NULL,
  CONSTRAINT temp_aemkh_disasters_pkey PRIMARY KEY (id)
)
WITH (OIDS=FALSE);
ALTER TABLE temp_aemkh_disasters OWNER TO postgres;

----Default is MDY
--set datestyle = 'ISO, MDY';

COPY temp_aemkh_disasters FROM 'C:\minus34\GitHub\Project-Doom\data/aemkh_disaster_event_extract_classified_Postgres_Input.csv' HEADER QUOTE '"' CSV;

UPDATE temp_aemkh_disasters
  SET start_date = case
                     when position(' ' in start_date) > 0 then left(start_date, position(' ' in start_date) - 1)
                     else start_date
                   end;

UPDATE temp_aemkh_disasters SET regions = 'AUS' where length(regions) > 21;

UPDATE temp_aemkh_disasters SET evacuated = null where evacuated = 0 ; -- 3
UPDATE temp_aemkh_disasters SET homeless = null where homeless = 0 ; -- 0
UPDATE temp_aemkh_disasters SET injuries = null where injuries = 0 ; -- 3
UPDATE temp_aemkh_disasters SET deaths = null where deaths = 0 ; -- 0
--UPDATE temp_aemkh_disasters SET insured_cost = null where insured_cost = 0 ;
UPDATE temp_aemkh_disasters SET homes_damaged = null where homes_damaged = 0 ; -- 1
UPDATE temp_aemkh_disasters SET homes_destroyed = null where homes_destroyed = 0 ; -- 0


DROP TABLE IF EXISTS aemkh_disasters;

CREATE TABLE aemkh_disasters
(
  id integer NOT NULL,
  type character varying(50) NOT NULL,
  sub_type character varying(50) NOT NULL,
  name character varying(255) NOT NULL,
  description character varying(7500) NOT NULL,
  year smallint NOT NULL,
  lat numeric(10,8) NOT NULL,
  long numeric(11,8) NOT NULL,
  evacuated integer NULL,
  homeless integer NULL,
  injuries integer NULL,
  deaths integer NULL,
  insured_cost money NULL,
  homes_damaged integer NULL,
  homes_destroyed integer NULL,
  regions character varying(50) NOT NULL,
  url character varying(255) NOT NULL,
  severity money NOT NULL,
  normalised_cost_2011 money NOT NULL,
  cost_2011_text character varying(50) NOT NULL,
  --geom geometry (POINT, 4326, 2),
  CONSTRAINT aemkh_disasters_pkey PRIMARY KEY (id)
)
WITH (OIDS=FALSE);
ALTER TABLE aemkh_disasters OWNER TO postgres;


insert into aemkh_disasters
select id
      ,type
      ,sub_type
      ,name
      ,description
      ,right(start_date,4)::int
      ,lat
      ,long
      ,COALESCE(evacuated, 0)
      ,COALESCE(homeless, 0)
      ,COALESCE(injuries, 0)
      ,COALESCE(deaths, 0)
      ,COALESCE(insured_cost, 0::money)
      ,COALESCE(homes_damaged, 0)
      ,COALESCE(homes_destroyed, 0)
      ,regions
      ,url
      ,0
      ,0
      ,''
      --,ST_SetSRID(ST_MakePoint(long, lat), 4326)
from temp_aemkh_disasters
where regions != 'Outside Australia'
and type not in ('Wartime', 'Maritime', 'Epidemic')
and sub_type not in ('Drought', 'Criminal')
and id not in (29, 46, 105, 513, 545, 250, 4470, 391, 191, 70)
and (
  (type <> 'Natural' and deaths > 5)
  or
  type = 'Natural'
)
and (deaths > 0 or (COALESCE(deaths, 0) = 0 and (COALESCE(injuries, 0) > 100 or COALESCE(insured_cost::numeric(12,0), 0) > 0)));


update aemkh_disasters set sub_type = 'Storm/Hail' where sub_type IN ('Severe Storm', 'Hail', 'Tornado');
update aemkh_disasters set sub_type = 'Rail' where sub_type = 'Road/rail';

--select * from aemkh_disasters where (deaths > 0 or (COALESCE(deaths, 0) = 0 and (COALESCE(injuries, 0) > 100 or COALESCE(insured_cost::numeric(11,0), 0) > 0))) order by insured_cost desc;
--select * from aemkh_disasters order by severity desc; -- 344

--Bring ICA 2011 cost over
update aemkh_disasters dis
  set insured_cost = ica.insured_cost
     ,normalised_cost_2011 = ica.normalised_cost_2011
  from ica_costs ica where dis.id = ica.id;

--Bring 2011 and later costs over
update aemkh_disasters set normalised_cost_2011 = insured_cost where year > 2010 and insured_cost IS NOT NULL; -- 14

update aemkh_disasters set normalised_cost_2011 = 507000000::money where id = 495;
update aemkh_disasters set normalised_cost_2011 = 109000000::money where id = 24;
update aemkh_disasters set normalised_cost_2011 = 215000000::money where id IN (63, 224);
update aemkh_disasters set normalised_cost_2011 = 2645000000::money where id = 114;
update aemkh_disasters set normalised_cost_2011 = 40000000::money where id = 490;
update aemkh_disasters set normalised_cost_2011 = 17000000::money where id = 499;
update aemkh_disasters set normalised_cost_2011 = 28000000::money where id = 442;
update aemkh_disasters set normalised_cost_2011 = 37000000::money where id = 514;
update aemkh_disasters set normalised_cost_2011 = 14000000::money where id = 404;
update aemkh_disasters set normalised_cost_2011 = 99000000::money where id = 424;
update aemkh_disasters set normalised_cost_2011 = 29000000::money where id = 36;
update aemkh_disasters set normalised_cost_2011 = 28000000::money where id = 333;
update aemkh_disasters set normalised_cost_2011 = 31000000::money where id = 338;
update aemkh_disasters set normalised_cost_2011 = 99000000::money where id = 504;
update aemkh_disasters set normalised_cost_2011 = 139000000::money where id = 546;
update aemkh_disasters set normalised_cost_2011 = 179000000::money where id = 427;
update aemkh_disasters set normalised_cost_2011 = 398000000::money where id = 177;
update aemkh_disasters set normalised_cost_2011 = 1492000000::money where id = 334;

--select * from aemkh_disasters where normalised_cost_2011 = 0::money and insured_cost > 0::money order by year desc;

update aemkh_disasters set severity = normalised_cost_2011 + (deaths::bigint * 3000000)::money + (injuries::bigint * 500000)::money + (homeless::bigint * 100000)::money + (evacuated::bigint * 100000)::money;

update aemkh_disasters
  set cost_2011_text = case
                    when normalised_cost_2011 = 0::money then 'Not known'
                    else replace(to_char(normalised_cost_2011::numeric(12,0)/1000000, '$999,999'), ' ', '') || 'm'
                  end;

select max(normalised_cost_2011) from aemkh_disasters;



--COPY aemkh_disasters TO 'C:\minus34\GitHub\Project-Doom\hstestcode/doom_stats.csv' HEADER CSV;


COPY (select * from aemkh_disasters where sub_type = 'Air') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsAir.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Bushfire') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsBushfire.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Cyclone') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsCyclone.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Earthquake') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsEarthquake.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Fire') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsFire.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Flood') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsFlood.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Heatwave') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsHeatwave.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Industrial') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsIndustrial.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Landslide') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsLandslide.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Rail') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsRail.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Riptide') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsRiptide.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Road') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsRoad.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Storm/Hail') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsStormHail.csv' HEADER CSV;
COPY (select * from aemkh_disasters where sub_type = 'Water') TO 'C:\minus34\GitHub\Project-Doom\hstestcode/pntsWater.csv' HEADER CSV;


COPY (
  select type
      ,sub_type
      ,Count(*) as count
      ,SUM(deaths) as deaths
      ,SUM(injuries) as injuries
      ,SUM(normalised_cost_2011::numeric(12,0)) as cost
      ,case
         when SUM(normalised_cost_2011::numeric(12,0)) = 0 then 'Not known'
         else replace(to_char(SUM(normalised_cost_2011::numeric(12,0))/1000000, '$999,999'), ' ', '') || 'm'
      end as cost_text 
    from aemkh_disasters
    group by type, sub_type
    order by deaths desc
) TO 'C:\minus34\GitHub\Project-Doom\hstestcode/statsDeath.csv' HEADER CSV;

COPY (
  select type
      ,sub_type
      ,Count(*) as count
      ,SUM(deaths) as deaths
      ,SUM(injuries) as injuries
      ,SUM(normalised_cost_2011::numeric(12,0)) as cost
      ,case
         when SUM(normalised_cost_2011::numeric(12,0)) = 0 then 'Not known'
         else replace(to_char(SUM(normalised_cost_2011::numeric(12,0))/1000000, '$999,999'), ' ', '') || 'm'
      end as cost_text 
    from aemkh_disasters
    group by type, sub_type
    order by injuries desc
) TO 'C:\minus34\GitHub\Project-Doom\hstestcode/statsInjuries.csv' HEADER CSV;

COPY (
  select type
      ,sub_type
      ,Count(*) as count
      ,SUM(deaths) as deaths
      ,SUM(injuries) as injuries
      ,SUM(normalised_cost_2011::numeric(12,0)) as cost
      ,case
         when SUM(normalised_cost_2011::numeric(12,0)) = 0 then 'Not known'
         else replace(to_char(SUM(normalised_cost_2011::numeric(12,0))/1000000, '$999,999'), ' ', '') || 'm'
      end as cost_text 
    from aemkh_disasters
    group by type, sub_type
    order by cost desc
) TO 'C:\minus34\GitHub\Project-Doom\hstestcode/statsCost.csv' HEADER CSV;




select * from aemkh_disasters;






--select id, year, sub_type, name, description, insured_cost from aemkh_disasters where type = 'Natural' and sub_type != 'Heatwave' order by year desc, insured_cost desc;

-- 
-- select dis.insured_cost, ica.insured_cost, * from aemkh_disasters dis, ica_costs ica where dis.id = ica.id
-- and COALESCE(dis.insured_cost, 0::money) <> COALESCE(ica.insured_cost, 0::money);


-- 
-- select * from aemkh_disasters where regions = 'AUS'
-- 
-- 
-- select * from aemkh_disasters where evacuated IS NOT NULL order by evacuated desc; -- 101 min
-- select * from aemkh_disasters where homeless IS NOT NULL order by homeless desc; -- 101 min
-- select * from aemkh_disasters where injuries IS NOT NULL order by injuries desc;
-- --select * from aemkh_disasters where deaths IS NOT NULL order by deaths desc;
-- select * from aemkh_disasters where insured_cost IS NOT NULL order by insured_cost desc;
-- select * from aemkh_disasters where homes_damaged IS NOT NULL order by homes_damaged desc;
-- select * from aemkh_disasters where homes_destroyed IS NOT NULL order by homes_destroyed desc;


-- 
-- SELECT Count(*), type, SUM(deaths) as deaths
--   FROM aemkh_disasters
--   group by type;
-- 
-- 173;"Natural";5304
-- 32;"Man made";658
-- 56;"Transport";940
-- 
-- SELECT type, sub_type, Count(*) count, SUM(deaths) as deaths, SUM(injuries) as injuries, SUM(normalised_cost_2011) as cost
--   FROM aemkh_disasters
--   group by type, sub_type
--   order by deaths desc;
-- 
-- 
-- Count, type, deaths, sub_type
-- 12;Man made;148;Fire
-- 20;Man made;510;Industrial
-- 55;Natural;680;Bushfire
-- 34;Natural;951;Cyclone
-- 3;Natural;13;Earthquake
-- 70;Natural;615;Flood
-- 17;Natural;2887;Heatwave
-- 4;Natural;38;Landslide
-- 1;Natural;5;Riptide
-- 68;Natural;124;Storm/Hail
-- 21;Transport;327;Air
-- 24;Transport;371;Rail
-- 8;Transport;126;Road
-- 3;Transport;116;Water
-- 
-- 
-- 12;"Man made";148;153;$0.00;"Fire"
-- 20;"Man made";510;37;$0.00;"Industrial"
-- 46;"Natural";680;4031;$5,264,500,000.00;"Bushfire"
-- 29;"Natural";951;700;$9,316,000,000.00;"Cyclone"
-- 1;"Natural";13;160;$3,240,000,000.00;"Earthquake"
-- 52;"Natural";609;740;$10,339,019,000.00;"Flood"
-- 16;"Natural";2887;368;$0.00;"Heatwave"
-- 4;"Natural";38;7;$0.00;"Landslide"
-- 1;"Natural";5;95;$0.00;"Riptide"
-- 24;"Natural";121;209;$7,955,000,000.00;"Storm/Hail"
-- 21;"Transport";327;16;$0.00;"Air"
-- 24;"Transport";371;1405;$0.00;"Rail"
-- 8;"Transport";126;225;$0.00;"Road"
-- 3;"Transport";116;0;$0.00;"Water"
-- 
-- 
-- 
-- 
-- select * from aemkh_disasters where sub_type = 'Criminal';

