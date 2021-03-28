import Pot from "../schema/potsSchema.js";
import asyncHandler from "express-async-handler";
import slugify from 'slugify'

// @desc    Update a pot
// @route   PUT /api/pots/:id
// @access  Private/Admin
const createOrUpdatePot = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            price,
            size,
            description,
            image,
            images,
            countInStock,
            discount,
            dimensions,
            colors,
            tags,
            sortBy
        } = req.body;

        const pot = await Pot.findById(req.params.id);
        if (pot) {
            pot.name = name;
            pot.slug = slugify(name);
            pot.price = price;
            pot.type = "pot"
            pot.size = size;
            pot.description = description;
            pot.image = image;
            pot.images = images;
            pot.countInStock = countInStock;
            pot.discount = discount
            pot.dimensions = dimensions;
            pot.colors = colors;
            pot.tags = tags;
            pot.sortBy = sortBy
            const updatedPot = await pot.save();
            res.json(updatedPot);
        } else {
            const newPot = new Pot({
                name: name,
                slug: slugify(name),
                type: "pot",
                size: size,
                price: price,
                image: image,
                images: images,
                countInStock: countInStock,
                views: 0,
                order: 0,
                numReviews: 0,
                description: description,
                dimensions: dimensions,
                colors: colors,
                sortBy,
                tags
            });
            const createdPot = await newPot.save();
            res.send(createdPot)
        }
    } catch (error) {
        res.status(404);
        throw new Error(error);
    }
});


//get pots for store screen
const getPots = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6
        const page = Number(req.query.pageNumber) || 1
        const sorted = req.query.sortBy
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {}

        const pots = await Pot.find({ ...keyword }, "name image images price slug _id countInStock tags").sort(sorted === "pricehightolow" ? { price: -1 } : sorted === "price" ? { price: 1 } : sorted === "views" ? { views: -1 } : sorted === "createdAt" ? { createdAt: 1 } : { sortBy: 1 })
        if (pots) {

            const unique = [...new Set(pots.map(item => item.name))]; // [ 'A', 'B']
            const storePots = []

            for (let i = 0; i < unique.length; i++) {
                const element = unique[i];
                const y = pots.find((x) => x.name === element)
                storePots.push(y)
            }
            const count = storePots.length
            const spots = storePots.slice((page - 1) * pageSize, page * pageSize)


            res.json({ storePots: spots, page, pages: Math.ceil(count / pageSize) });
        }
    } catch (error) {
        res.status(404);
        throw new Error("Pot not found");
    }
});


const getAllPots = asyncHandler(async (req, res) => {
    try {
        const pots = await Pot.find({}, '_id slug name image images size countInStock')
        if (pots) {
            res.json(pots);
        }
    } catch (error) {
        res.status(404);
        throw new Error("Pot not found");
    }
});

const getOnePot = asyncHandler(async (req, res) => {
    try {
        const pot = await Pot.findById(req.params.id).populate('colors');
        if (pot) {
            res.send(pot)
        }
    } catch (error) {
        res.status(404);
        throw new Error("Pot not found");
    }

});
const getOnePotType = asyncHandler(async (req, res) => {
    try {
        const pot = await Pot.find({ slug: req.params.slug }).populate('colors');
        if (pot) {
            res.send(pot)
        }
    } catch (error) {
        res.status(404);
        throw new Error("Pot not found");
    }

});


const deletePots = asyncHandler(async (req, res) => {
    const pot = await Pot.findById(req.params.id);

    if (pot) {
        await pot.remove();
        res.json("Pot removed");
    } else {
        res.status(404);
        throw new Error("Pot not found");
    }
});
const createPotReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const pot = await Pot.findById(req.params.id)

    if (pot) {
        const alreadyReviewed = pot.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('pot already reviewed')
        }

        const review = {
            name: req.user.email.split('@')[0],
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        pot.reviews.push(review)

        pot.numReviews = pot.reviews.length

        const reduced =
            pot.reviews.reduce((acc, item) => item.rating + acc, 0) /
            pot.reviews.length

        pot.rating = reduced > 1 && reduced <= 1.5 ? 1.5 : reduced > 1.5 && reduced <= 2

            ? 2 : reduced > 2 && reduced <= 2.5 ? 2.5 : reduced > 2.5 && reduced <= 3 ? 3
                : reduced > 3 && reduced <= 3.5 ? 3.5 : reduced > 3.5 && reduced <= 4 ? 4 : reduced > 4 && reduced <= 4.5 ? 4.5 : 5
        await pot.save()

        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('pot not found')
    }
})

const potsYouMightLike = asyncHandler(async (req, res) => {
    try {
        const pots = await Pot.find()
        if (pots) {
            const unique = [...new Set(pots.map(item => item.name))]; // [ 'A', 'B']
            const storePots = []

            for (let i = 0; i < unique.length; i++) {
                const element = unique[i];
                const y = pots.find((x) => x.name === element)
                storePots.push(y)
            }
            const spots = storePots.slice(0, 4)
            console.log(spots.length)

            res.json(storePots.slice(0, 4));
        }
    } catch (error) {
        res.status(404);
        throw new Error("Pot not founds");
    }
});



export {
    createOrUpdatePot,
    getPots,
    deletePots,
    getOnePot,
    getAllPots,
    getOnePotType,
    createPotReview,
    potsYouMightLike

};
