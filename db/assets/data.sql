/* 
BUILDING THE TABLES
*/


create table ACCOUNTS(
    ACCOUNT_ID INT NOT NULL AUTO_INCREMENT ,
    ACCOUNT_NAME VARCHAR(25) NOT NULL,
    ACCOUNT_PASS VARCHAR(200) NOT NULL,
    ACCOUNT_EMAIL VARCHAR(25) UNIQUE,
    
    PRIMARY KEY(ACCOUNT_ID)
);


CREATE TABLE OPERATIONS(
    OPERATION_ID INT NOT NULL AUTO_INCREMENT ,
    ACCOUNT_ID INT NOT NULL,
    OPERATION_TYPE VARCHAR(1),
    AMOUNT DECIMAL(20,2),

    PRIMARY KEY (OPERATION_ID),
    FOREIGN KEY (ACCOUNT_ID) REFERENCES ACCOUNTS(ACCOUNT_ID)
    ON DELETE CASCADE
);

/* TODO: 
    - Implement Balance table
    - Implement trigger in balance table  
    */


