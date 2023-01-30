const mongoose = require("mongoose");
const Categories = require("../models/category_db");
const Account = require("../models/account_db");

class CategoryController {
    async getCategoryByID(request, response) {
        console.log(request.params._id);

        try {
            const id = request.params._id;
            const data = await Categories.findById(id);
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getCategoryByName(request, response) {
        console.log(request.params.name);
        try {
            const name = request.params.name;
            const data = await Categories.find({ name: name });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getCategoryByCreator(request, response) {
        console.log(request.params.creator);
        try {
            const creator = request.params.creator;
            const data = await Categories.find({ creator: creator });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getAllCategory(request, response) {
        try {
            const data = await Categories.find();
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async addNewCategory(request, response) {
        console.log(request.body);
        try {
            const { name, description, creator } = request.body;
            const data = new Categories({
                name,
                description,
                creator
            });
            const newCategory = await data.save();
            const user = await Account.findOneAndUpdate({ username: creator }, { $push: { "categories": newCategory._id } });
            console.log(newCategory);
            console.log(user)
            response.status(200).json({ messages: "Successfully created the new category!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async updateCategoryByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const updateData = request.body;
            const options = { new: true };
            const data = await Categories.findByIdAndUpdate(id, updateData, options);
            console.log(data);
            response.status(200).json({ messages: "Successfully Updated the category!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async deleteCategoryByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const data = await Categories.findByIdAndDelete(id);
            console.log(data);
            response.status(200).json({ messages: "Successfully deleted the category!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }


}

module.exports = new CategoryController();