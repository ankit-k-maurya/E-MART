import { DataTypes, INTEGER, Model, Op, STRING } from "sequelize";
import sequelize from "./indexorm.js";

class Schedule extends Model { }
Schedule.init({
    ScheduleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        Comment: 'AutoIncrement primary key'
    },
    Task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TaskDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    TaskTime: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Schedule',
    obj: 'Schedule',
    timestamps: false
});

class Customer extends Model { }
Customer.init({
    CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'AutoIncrement CustomerId key'
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        defaultValue: 'Singh'
    },
    Address: {
        type: DataTypes.TEXT,
    },
    EmailID: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Customer',
    obj: 'Customer',
    timestamps: false
});

class Categories extends Model { }
Categories.init({
    CategoriesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'AutoIncrement has been CategoriesID'
    },
    CategoriesName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Categories',
    obj: 'Categories',
    timestamps: false
});

class Product extends Model { }
Product.init({
    ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'AutoIncrement has been ProductId'
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    StokQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Images: {
        type: DataTypes.STRING
    },
    Descreption: {
        type: DataTypes.TEXT,
    }
}, {
    sequelize,
    modelName: 'Product',
    obj: 'Product',
    timestamps: false
});

class Order extends Model { }
Order.init({
    OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Order has been autoincrement'
    },
    OderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Order',
    obj: 'Order',
    timestamps: false
});

class OrderItem extends Model { }
OrderItem.init({
    OrderItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'OrderItemID has been autoincrement'
    },
    Quantity: {
        type: DataTypes.INTEGER
    },
    SubTotal: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'OrderItem',
    obj: 'OrederItem',
    timestamps: false
});

Product.belongsTo(Categories);
Categories.hasMany(Product);
Order.belongsTo(Customer);
Customer.hasMany(Order);
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

try {
    sequelize.authenticate();
    sequelize.sync({ alter: true })
    console.log('Connection has been  established successfully.');

    var Createschedule = async (Task, TaskDate, TaskTime) => {
        console.log('Task, TaskDate, TaskTime', Task, TaskDate, TaskTime);
        await Schedule.create({ Task: Task, TaskDate: TaskDate, TaskTime: TaskTime }, { returning: false })
        const result = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        console.log('Schedule: ', result);
        return result;
    }

    var getSchedule = async () => {
        const data = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        console.log("ScheduleData:", data)
        return data;
    }

    var UpdateSchedule = async (ScheduleID, Task, TaskDate, TaskTime) => {
        await Schedule.update({ ScheduleID: ScheduleID, Task: Task, TaskDate: TaskDate, TaskTime: TaskTime },
            {
                where: {
                    ScheduleID: ScheduleID
                },
                returning: false,
            });
        const data = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        return data;
    }

    var DeletedSchedule = async (ScheduleID) => {
        const data = await Schedule.destroy({
            where: {
                ScheduleID: ScheduleID,
            }
        });
        return data;
    }

    var Createcustomer = async (FirstName, LastName, Address, EmailID, Password) => {
        const data = await Customer.create({
            FirstName: FirstName, LastName: LastName, Address: Address, EmailID: EmailID, Password: Password
        });
        console.log('CreateCustomer:', data)
        return data;
    }

    var getEmailPassword = async (EmailID, Password) => {
        const result = await Customer.findOne({
            where: {
                EmailID: EmailID,
                Password: Password
            }
        })
        console.log('data:',result)
        return result;
    }

    var Createcategories = async (CategoriesName) => {
        const data = await Categories.create({ CategoriesName: CategoriesName })
        console.log('Categories:', data)
        return data;
    }

    var CreateProduct = async (ProductName, Price, StokQuantity, Images, Descreption, CategoryCategoriesID) => {
        console.log('ProductName, Price, StokQuantity, Images, Descreption, CategoryCategoriesID',
            ProductName, Price, StokQuantity, Images, Descreption, CategoryCategoriesID
        )
        const data = await Product.create({
            ProductName: ProductName, Price: Price, StokQuantity: StokQuantity, Images: Images, CategoryCategoriesID: CategoryCategoriesID, Descreption: Descreption
        });
        console.log('CreateProduct', data);
        return data;
    }

    var GetProductDetaile = async () => {
        const data = await Product.findAll({
            attributes: [
                ['ProductID', 'ID'],
                ['ProductName', 'Name'],
                ['Images', 'image'],
                'Price', 'StokQuantity', 'Descreption',
                [sequelize.literal('"Category"."CategoriesName"'), 'CategoriesName']
            ],
            include: [{
                model: Categories,
                required: true,
                attributes: [],
            }],
        });
        console.log('ProductDetails:', data)
        return data;
    }

    var CreateOrder = async (OderDate, Amount, CustomerID) => {
        console.log('OderDate,Amount,CustomerCustomerID', OderDate, Amount, CustomerID)
        const data = await Order.create({
            OderDate: OderDate, Amount: Amount, CustomerCustomerID: CustomerID
        })
        console.log('OrderDetails:', data)
        return data;
    }

    var CreateOrderitem = async (OrderID, ProductID, Quantity, SubTotal) => {
        console.log('OrderID, ProductID, Quantity, SubTotal', OrderID, ProductID, Quantity, SubTotal)
        const data = await OrderItem.create({
            OrderOrderID: OrderID, ProductProductID: ProductID, Quantity: Quantity, SubTotal: SubTotal
        })
        console.log('OrderItemsDetails:', data)
        return data;
    }

    var OrderDetails = async (CustomerID) => {
        const query = (`
            SELECT CONCAT("Customers"."FirstName", '', "Customers"."LastName") AS FULLNAME,
       STRING_AGG(DISTINCT "Products"."ProductName", ',')          AS PRODUCTNAME,
   SUM("OrderItems"."Quantity")AS Quantity,
       SUM("OrderItems"."SubTotal")                                AS SUMAmount
FROM "Orders"
         INNER JOIN "OrderItems" ON "Orders"."OrderID" = "OrderItems"."OrderOrderID"
         INNER JOIN "Customers" ON "Orders"."CustomerCustomerID" = "Customers"."CustomerID"
         INNER JOIN "Products" ON "OrderItems"."ProductProductID" = "Products"."ProductID"
WHERE ("Customers"."CustomerID" = ${CustomerID})
GROUP BY "ProductName", CONCAT("Customers"."FirstName", '', "Customers"."LastName")
 `)
        const data = await sequelize.query(query);
        return data;
    }
}
catch (error) {
    console.log('Unable to connect the database :', error)
}
export { Createschedule, getSchedule, UpdateSchedule, DeletedSchedule, Createcustomer, getEmailPassword, Createcategories, CreateProduct, GetProductDetaile, CreateOrder, CreateOrderitem, OrderDetails }
