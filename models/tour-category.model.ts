import { DataTypes } from "sequelize";
import sequelize from "../config/database";
const TourCategory = sequelize.define("TourCategory", {
  tour_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'tours', // Tên bảng mà khóa ngoại tham chiếu đến
      key: 'id', // Tên trường trong bảng mà khóa ngoại tham chiếu đến
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'categories', // Tên bảng mà khóa ngoại tham chiếu đến
      key: 'id', // Tên trường trong bảng mà khóa ngoại tham chiếu đến
    }
  }
}, {
  tableName: 'tours_categories',
  timestamps: false,
});
export default TourCategory;