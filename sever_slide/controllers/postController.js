const Post = require("../models/post_db");
const Account = require("../models/account_db");


class PostController {
    async getPostByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const data = await Post.findById(id);
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getPostByName(request, response) {
        console.log(request.params.name);
        try {
            const name = request.params.name;
            const data = await Post.find({ name: name });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }
    async getPostByCreator(request, response) {
        console.log(request.params.creator);
        try {
            const creator = request.params.creator;
            const data = await Post.find({ creator: creator });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getPostByThreadID(request, response) {
        console.log(request.params.creator);
        try {
            const threadID = request.params.threadID;
            const data = await Post.find({ threadID: threadID });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async getAllPost(request, response) {
        try {
            const data = await Post.find();
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async addNewPost(request, response) {
        console.log(request.body);
        try {
            const { name, description, creator, categoryID } = request.body;
            const data = new Post({
                name,
                content,
                creator,
                threadID
            });
            const newPost = await data.save();
            const user = await Account.findOneAndUpdate({ username: creator }, { $push: { "posts": newPost._id } });
            console.log(newPost);
            console.log(user)
            response.status(200).json({ messages: "Successfully created the new Post!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async updatePostByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const updateData = request.body;
            const options = { new: true };
            const data = await Post.findByIdAndUpdate(id, updateData, options);
            console.log(data);
            response.status(200).json({ messages: "Successfully Updated the Post!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async deletePostByID(request, response) {
        console.log(request.params._id);
        try {
            const id = request.params._id;
            const data = await Post.findByIdAndDelete(id);
            console.log(data);
            response.status(200).json({ messages: "Successfully deleted the Post!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }


}

module.exports = new PostController();