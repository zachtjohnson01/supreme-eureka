module.exports = function(sequelize, DataTypes) {
    var groceryTrip = sequelize.define("groceryTrip", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        grocery_store_name: DataTypes.STRING,
        item_count: DataTypes.STRING,
        tax: DataTypes.STRING,
        trip_date: DataTypes.STRING,
    });
    return groceryTrip;
};