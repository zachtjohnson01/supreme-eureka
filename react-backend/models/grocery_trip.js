module.exports = function(sequelize, DataTypes) {
    var groceryTrip = sequelize.define("groceryTrip", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        grocery_store_name: DataTypes.STRING,
        trip_date: DataTypes.DATE,
        item_count: DataTypes.INTEGER,
        tax: DataTypes.FLOAT
    });
    return groceryTrip;
};