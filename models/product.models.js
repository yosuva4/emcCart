module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            price: String,
            image_path: String
        },
        {
            timestamps: true
        }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("product", schema);
}