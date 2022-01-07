create type occupation as enum (
	'none',
	'employee',
	'freelancer',
	'owner',
	'agriculturist',
	'student',
	'unemployed',
	'retired'
	);

create type education_level as enum (
	'none',
	'primary_school',
	'secondary_school',
	'high_school',
	'vocational_school',
	'post_secondary_school',
	'short_term_higher_education',
	'higher_education',
	'unspecified'
	);

create type country as enum (
	'AF',
	'AL',
	'DZ',
	'AS',
	'AD',
	'AO',
	'AI',
	'AQ',
	'AG',
	'AR',
	'AM',
	'AW',
	'AU',
	'AT',
	'AZ',
	'BS',
	'BH',
	'BD',
	'BB',
	'BY',
	'BE',
	'BZ',
	'BJ',
	'BM',
	'BT',
	'BO',
	'BA',
	'BW',
	'BV',
	'BR',
	'IO',
	'BN',
	'BG',
	'BF',
	'BI',
	'KH',
	'CM',
	'CA',
	'CV',
	'KY',
	'CF',
	'TD',
	'CL',
	'CN',
	'CX',
	'CC',
	'CO',
	'KM',
	'CG',
	'CD',
	'CK',
	'CR',
	'CI',
	'HR',
	'CU',
	'CY',
	'CZ',
	'DK',
	'DJ',
	'DM',
	'DO',
	'EC',
	'EG',
	'SV',
	'GQ',
	'ER',
	'EE',
	'ET',
	'FK',
	'FO',
	'FJ',
	'FI',
	'FR',
	'GF',
	'PF',
	'TF',
	'GA',
	'GM',
	'GE',
	'DE',
	'GH',
	'GI',
	'GR',
	'GL',
	'GD',
	'GP',
	'GU',
	'GT',
	'GG',
	'GN',
	'GW',
	'GY',
	'HT',
	'HM',
	'VA',
	'HN',
	'HK',
	'HU',
	'IS',
	'IN',
	'ID',
	'IR',
	'IQ',
	'IE',
	'IM',
	'IL',
	'IT',
	'JM',
	'JP',
	'JE',
	'JO',
	'KZ',
	'KE',
	'KI',
	'KP',
	'KR',
	'KW',
	'KG',
	'LA',
	'LV',
	'LB',
	'LS',
	'LR',
	'LY',
	'LI',
	'LT',
	'LU',
	'MO',
	'MK',
	'MG',
	'MW',
	'MY',
	'MV',
	'ML',
	'MT',
	'MH',
	'MQ',
	'MR',
	'MU',
	'YT',
	'MX',
	'FM',
	'MD',
	'MC',
	'MN',
	'ME',
	'MS',
	'MA',
	'MZ',
	'MM',
	'NA',
	'NR',
	'NP',
	'NL',
	'AN',
	'NC',
	'NZ',
	'NI',
	'NE',
	'NG',
	'NU',
	'NF',
	'MP',
	'NO',
	'OM',
	'PK',
	'PW',
	'PS',
	'PA',
	'PG',
	'PY',
	'PE',
	'PH',
	'PN',
	'PL',
	'PT',
	'PR',
	'QA',
	'RE',
	'RO',
	'RU',
	'RW',
	'SH',
	'KN',
	'LC',
	'PM',
	'VC',
	'WS',
	'SM',
	'ST',
	'SA',
	'SN',
	'RS',
	'SC',
	'SL',
	'SG',
	'SK',
	'SI',
	'SB',
	'SO',
	'ZA',
	'GS',
	'ES',
	'LK',
	'SD',
	'SR',
	'SJ',
	'SZ',
	'SE',
	'CH',
	'SY',
	'TW',
	'TJ',
	'TZ',
	'TH',
	'TL',
	'TG',
	'TK',
	'TO',
	'TT',
	'TN',
	'TR',
	'TM',
	'TC',
	'TV',
	'UG',
	'UA',
	'AE',
	'GB',
	'US',
	'UM',
	'UY',
	'UZ',
	'VU',
	'VE',
	'VN',
	'VG',
	'VI',
	'WF',
	'EH',
	'YE',
	'ZM',
	'ZW'
	);

create type blood_group as enum (
	'A',
	'B',
	'AB',
	'0'
	);

create type blood_rh as enum (
	'+',
	'-'
	);

create type measurement_kind as enum (
	'weight',
	'waist'
	);

create type anamnesis_kind as enum (
	'family_history',
	'personal_history',
	'lifestyle',
	'behavior'
	);

create type reaction_kind as enum (
	'allergy',
	'medicine'
	);

create type problem_kind as enum (
	'respiratory',
	'cardiovascular',
	'liver',
	'blue_ducts',
	'spleen',
	'urogenital',
	'nervous',
	'endocrine',
	'sensory'
	);

create type county as enum (
	'alba',
	'arad',
	'arges',
	'bacau',
	'bihor',
	'bistrita-nasaud',
	'botosani',
	'brasov',
	'braila',
	'bucuresti',
	'buzau',
	'caras-severin',
	'calarasi',
	'cluj',
	'constanta',
	'covasna',
	'dambovita',
	'dolj',
	'galati',
	'giurgiu',
	'gorj',
	'harghita',
	'hunedoara',
	'ialomita',
	'iasi',
	'ilfov',
	'maramures',
	'mehedinti',
	'mures',
	'neamt',
	'olt',
	'prahova',
	'satu mare',
	'salaj',
	'sibiu',
	'suceava',
	'teleorman',
	'timis',
	'tulcea',
	'vaslui',
	'valcea',
	'vrancea'
	);

create type account_kind as enum (
	'patient',
	'family_medic',
	'hospital_medic',
	'hospital_manager'
	);

create type account_code_kind as enum (
	'email_validation',
	'password_reset'
	);

create table accounts_base (
	id                 serial primary key,
	email              text      not null
		constraint c_account_unique_email unique,
	has_verified_email boolean   not null default false,
	password           text      not null,
	created_at         timestamp not null default localtimestamp,
	deleted_at         timestamp          default null
);

create table account_codes (
	code       text primary key,
	kind       account_code_kind not null,
	account_id int               not null references accounts_base on delete cascade on update cascade,
	expires_at timestamp         not null
);

create index idx_account_codes_kind on account_codes (kind);
create index idx_account_codes_account on account_codes (account_id);

create table family_medics (
	account_id int primary key references accounts_base on delete cascade on update cascade,
	person_id  int unique not null
);

create table people (
	id                       serial primary key,
	family_medic_id          int                      default null references family_medics on delete set null on update cascade,
	cnp                      varchar(13)     not null
		constraint c_person_unique_cnp unique,
	name                     text            not null,
	birthday                 date            not null,
	citizenship              country,
	home                     text            not null,
	residence                text            not null,
	occupation               occupation      not null default 'none',
	workplace                text
		constraint c_person_required_workplace check (occupation = 'none' or occupation = 'retired' or workplace is not null),
	education_level          education_level not null default 'unspecified',
	birth_weight             numeric                  default null,
	blood_group              blood_group              default null,
	blood_rh                 blood_rh                 default null,
	ci_series                varchar(3)      not null,
	ci_number                varchar(10)     not null,
	birth_certificate_series varchar(2),
	birth_certificate_number varchar(6),
	constraint c_person_minor_bc_required check (date_part('year', age(birthday)) >= 18 or
																							 (birth_certificate_series is not null and
																								birth_certificate_number is not null)),
	created_at               timestamp       not null default localtimestamp,
	updated_at               timestamp                default null,
	deleted_at               timestamp                default null
);

alter table family_medics
	add constraint fk_family_medic_person foreign key (person_id) references people on delete restrict on update cascade;

create function check_circular_family_medic_person() returns trigger as
$$
begin
	if (select person_id from family_medics where account_id = new.family_medic_id) = new.id then
		raise exception 'tried to create person with family medic that is the same person %', new.id;
	end if;
	return new;
end;
$$ language plpgsql;

create function check_circular_person_family_medic() returns trigger as
$$
begin
	if (select family_medic_id from people where id = new.person_id) = new.account_id then
		raise exception 'tried to create family medic with person who has identical family medic %', new.account_id;
	end if;
	return new;
end;
$$ language plpgsql;

create trigger check_circular_family_medic_person_insert
	before insert
	on people
execute function check_circular_family_medic_person();

create trigger check_circular_family_medic_person_update
	before update
	on people
	for each row
	when (old.family_medic_id is distinct from new.family_medic_id)
execute function check_circular_family_medic_person();

create trigger check_circular_person_family_medic_insert
	before insert
	on family_medics
execute function check_circular_person_family_medic();

create trigger check_circular_person_family_medic_update
	before update
	on family_medics
	for each row
	when (old.person_id is distinct from new.person_id)
execute function check_circular_person_family_medic();

create table patients (
	account_id int primary key references accounts_base on delete cascade on update cascade,
	person_id  int unique not null references people on delete restrict on update cascade
);

create table changes (
	id         serial primary key,
	created_by int       not null references accounts_base on delete no action on update cascade,
	deleted_by int                default null references accounts_base on delete no action on update cascade,
	created_at timestamp not null default localtimestamp,
	deleted_at timestamp          default null
);

create table measurements (
	change_id int primary key references changes on delete no action on update cascade,
	person_id int              not null references people on delete no action on update cascade,
	kind      measurement_kind not null,
	value     numeric          not null
);

create index idx_measurements_person on measurements (person_id);
create index idx_measurements_kind on measurements (kind);

create table reactions (
	change_id int primary key references changes on delete no action on update cascade,
	person_id int           not null references people on delete no action on update cascade,
	kind      reaction_kind not null,
	info      text          not null
);

create index idx_reactions_person on reactions (person_id);
create index idx_reactions_kind on reactions (kind);

create table anamnesis (
	change_id int primary key references changes on delete no action on update cascade,
	person_id int            not null references people on delete no action on update cascade,
	kind      anamnesis_kind not null,
	info      text           not null
);

create index idx_anamnesis_person on anamnesis (person_id);
create index idx_anamnesis_kind on anamnesis (kind);

create table problems (
	change_id int primary key references changes on delete no action on update cascade,
	person_id int          not null references people on delete no action on update cascade,
	kind      problem_kind not null,
	info      text         not null
);

create index idx_problems_person on problems (person_id);
create index idx_problems_kind on problems (kind);


create table hospitals (
	id         serial primary key,
	name       text      not null,
	county     county    not null,
	address    text      not null,
	created_at timestamp not null default localtimestamp,
	deleted_at timestamp          default null
);

create table hospital_managers (
	account_id  int primary key references accounts_base on delete cascade on update cascade,
	hospital_id int not null unique references hospitals on delete cascade on update cascade
);

create table hospital_medics (
	account_id  int primary key references accounts_base on delete cascade on update cascade,
	hospital_id int not null references hospitals on delete cascade on update cascade,
	person_id   int not null references people on delete restrict on update cascade
);

create table hospitalizations (
	id             serial primary key,
	hospital_id    int       not null references hospitals on delete cascade on update cascade,
	person_id      int       not null references people on delete cascade on update cascade,
	started_at     timestamp not null default localtimestamp,
	ended_at       timestamp          default null,
	started_by     int       not null references hospital_medics on delete no action on update cascade,
	ended_by       int                default null references hospital_medics on delete no action on update cascade,
	diagnostic_end text               default null
);

create index idx_hospital_medics_hospital on hospital_medics (hospital_id);

create table family_medics_hospitals (
	family_medic_id int not null references family_medics on delete cascade on update cascade,
	hospital_id     int not null references hospitals on delete cascade on update cascade,
	primary key (family_medic_id, hospital_id)
);

create index idx_family_medics_hospitals_medic on family_medics_hospitals (family_medic_id);


create materialized view accounts as
(
select a.id,
			 'patient'::account_kind as kind,
			 a.email,
			 a.has_verified_email,
			 a.password,
			 a.created_at,
			 a.deleted_at,
			 pp.cnp,
			 null::int               as hospital
from accounts_base a
			 inner join patients pt on a.id = pt.account_id
			 join people pp on pt.person_id = pp.id
union all
select a.id,
			 'family_medic'::account_kind as kind,
			 a.email,
			 a.has_verified_email,
			 a.password,
			 a.created_at,
			 a.deleted_at,
			 p.cnp,
			 null::int                    as hospital
from accounts_base a
			 inner join family_medics fm on a.id = fm.account_id
			 join people p on fm.person_id = p.id
union all
select a.id,
			 'hospital_medic'::account_kind as kind,
			 a.email,
			 a.has_verified_email,
			 a.password,
			 a.created_at,
			 a.deleted_at,
			 p.cnp,
			 hm.hospital_id                 as hospital
from accounts_base a
			 inner join hospital_medics hm on a.id = hm.account_id
			 join people p on hm.person_id = p.id
union all
select a.id,
			 'hospital_manager'::account_kind as kind,
			 a.email,
			 a.has_verified_email,
			 a.password,
			 a.created_at,
			 a.deleted_at,
			 null                             as cnp,
			 h2.id                            as hospital
from accounts_base a
			 inner join hospital_managers h on a.id = h.account_id
			 join hospitals h2 on h2.id = h.hospital_id
	);

create unique index idx_accounts_unique_id on accounts (id);

create function refresh_accounts() returns trigger as
$$
begin
	refresh materialized view accounts;
	return null;
end;
$$ language plpgsql;

create trigger refresh_accounts
	after update
	on accounts_base
	for each row
execute function refresh_accounts();

create trigger refresh_accounts_patients
	after insert or update
	on patients
	for each row
execute function refresh_accounts();

create trigger refresh_accounts_family_medics
	after insert or update
	on family_medics
	for each row
execute function refresh_accounts();

create trigger refresh_accounts_hospital_medics
	after insert or update
	on hospital_medics
	for each row
execute function refresh_accounts();

create trigger refresh_accounts_hospital_managers
	after insert or update
	on hospital_managers
	for each row
execute function refresh_accounts();

create trigger refresh_accounts_cnp
	after update
	on people
	for each row
	when (old.cnp is distinct from new.cnp)
execute function refresh_accounts();
