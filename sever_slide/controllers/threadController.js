const Thread = require("../models/thread_db");
const Account = require("../models/account_db");


class ThreadController {
    async getThreadByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const data = await Thread.findById(id);
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getThreadByName(request, response) {
        console.log(request.params.name);
        try {
            const name = request.params.name;
            const data = await Thread.find({ name: name });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getThreadByCreator(request, response) {
        console.log(request.params.creator);
        try {
            const creator = request.params.creator;
            const data = await Thread.find({ creator: creator });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getThreadByCategoryID(request, response) {
        console.log(request.params.creator);
        try {
            const categoryID = request.params.categoryID;
            const data = await Thread.find({ categoryID: categoryID });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getAllThread(request, response) {
        try {
            const data = await Thread.find();
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async addNewThread(request, response) {
        console.log(request.body);
        try {
            const { name, description, creator, categoryID } = request.body;
            const data = new Thread({
                name,
                description,
                creator,
                categoryID
            });
            const newThread = await data.save();
            const user = await Account.findOneAndUpdate({ username: creator }, { $push: { "threads": newThread._id } });
            console.log(newThread);
            console.log(user)
            response.status(200).json({ messages: "Successfully created the new Thread!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async updateThreadByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const updateData = request.body;
            const options = { new: true };
            const data = await Thread.findByIdAndUpdate(id, updateData, options);
            console.log(data);
            response.status(200).json({ messages: "Successfully Updated the Thread!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async deleteThreadByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const data = await Thread.findByIdAndDelete(id);
            console.log(data);
            response.status(200).json({ messages: "Successfully deleted the Thread!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }


}

module.exports = new ThreadController();