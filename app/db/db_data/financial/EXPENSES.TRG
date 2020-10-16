TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER expenses_AI\n   AFTER INSERT ON EXPENSES\n     FOR EACH ROW\n       BEGIN\n          DECLARE summont decimal(10,2);\n          DECLARE expunt decimal(10,2);\n           DECLARE TB_AMOUNT decimal(10,2);\n\n            SELECT SUM(AMOUNT) INTO summont from INCOME where new.ACCOUNT_ID=ACCOUNT_ID;\n            SELECT SUM(AMOUNT) INTO expunt from EXPENSES where new.ACCOUNT_ID=ACCOUNT_ID;\n            set TB_AMOUNT := summont-expunt;\n\n          INSERT INTO BALANCE(ACCOUNT_ID,EXPENSES_ID,TOTAL_INCOME,TOTAL_EXPENSES,TOTAL_AMOUNT)\n          VALUES ((SELECT ACCOUNTS.ACCOUNT_ID FROM INCOME inner join ACCOUNTS on INCOME.ACCOUNT_ID=ACCOUNTS.ACCOUNT_ID limit 1 ),NEW.EXPENSES_ID,summont, expunt,TB_AMOUNT);\nEND'
sql_modes=1436549152
definers='root@localhost'
client_cs_names='latin1'
connection_cl_names='latin1_swedish_ci'
db_cl_names='latin1_swedish_ci'
created=160260958158
