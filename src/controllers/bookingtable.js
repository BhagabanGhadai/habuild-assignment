const client=require('../postgres')

const createBookingTable = async (query) => {
    try {
        await client.query(query);  
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
    };

    const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL,
        trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
        trip_date DATE,
        seat_number INTEGER UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_on DATE NOT NULL,
        PRIMARY KEY (id, trip_id, user_id))`;

       createBookingTable(bookingCreateQuery).then(result => {
            if (result) {
                console.log('Booking Table created');
            }
        });

        //============================================
        const createTripTable = async (query) => {
            try {
                await client.query(query);  
                return true;
            } catch (error) {
                console.error(error.stack);
                return false;
            } 
            };
            const TripQuery = `CREATE TABLE IF NOT EXISTS trip(id SERIAL,
                start_point VARCHAR(100) NOT NULL,
                last_point VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                created_on DATE NOT NULL,
                PRIMARY KEY (id))`;
            createTripTable(TripQuery).then(result => {
                if (result) {
                    console.log('Trip Table created');
                }
            });

            //===========================================
            const createBusTable = async (query) => {
                try {
                    await client.query(query);  
                    return true;
                } catch (error) {
                    console.error(error.stack);
                    return false;
                } 
                };
                const BusQuery = `CREATE TABLE IF NOT EXISTS bus(id SERIAL,
                    bus_no int NOT NULL,
                    PRIMARY KEY (id))`;
                createBusTable(BusQuery).then(result => {
                    if (result) {
                        console.log('Bus Table created');
                    }
                });
        module.exports={createBookingTable,createTripTable,createBusTable}
        