module.exports = function(sequelize, DataTypes) {
    var groceryTrip = sequelize.define("groceryTrip", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        grocery_store_name: DataTypes.STRING,
        trip_date: DataTypes.STRING,
        grocery_store_item_name: DataTypes.STRING,
        item_name: DataTypes.STRING,
        price: DataTypes.STRING,
        tax: DataTypes.STRING
    });
    return groceryTrip;
};