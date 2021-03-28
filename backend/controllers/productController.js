import Product from "../schema/productSchema.js";
import asyncHandler from "express-async-handler";


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const createOrUpdateProduct = asyncHandler(async (req, res) => {
  const count = await Product.countDocuments()
  const {
    name,
    price,
    description,
    image,
    images,
    family,
    genericName,
    countInStock,
    light,
    water,
    pets,
    discount,
    availablePots,
    tags,
    displayImages,
    sortBy

  } = req.body;
  console.log(sortBy)
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.type = "plant";
    product.price = price;
    product.description = description;
    product.image = image;
    product.displayImages = displayImages,
      product.images = images;
    product.countInStock = countInStock;
    product.light = light
    product.water = water
    product.pets = pets
    product.availablePots = availablePots
    product.family = family;
    product.genericName = genericName;
    product.defaultLink = ""
    product.discount = discount
    product.defaultLink = availablePots[0]
    product.tags = tags;
    product.sortBy = sortBy

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    const product = new Product({
      name: name,
      type: "plant",
      price: price,
      image: image,
      images: images,
      displayImages: displayImages,
      countInStock: countInStock,
      family: family,
      genericName: genericName,
      light: light,
      water: water,
      pets: pets,
      views: 0,
      order: 0,
      numReviews: 0,
      availablePots: availablePots,
      description: description,
      defaultLink: availablePots[0],
      sortBy: count + 1,
      tags
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {

    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1
    const sorted = req.query.sortBy
    console.log(sorted, "this is sorted")
    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {}
    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword }).sort(sorted === "pricehightolow" ? { price: -1 } : sorted === "price" ? { price: 1 } : sorted === "views" ? { views: -1 } : sorted === "createdAt" ? { createdAt: 1 } : { sortBy: 1 }).limit(pageSize)
      .skip(pageSize * (page - 1));
      
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});




//for edit screen
const getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('availablePots', '_id , name , size , image , colors,type ')
    .populate({ path: 'availablePots', populate: 'colors' });
  const { _id, tags, displayImages, sortBy, availablePots, numReviews, rating, reviews, images, image, price, discount, countInStock, name, family, genericName, light, pets, water, description, defaultLink } = product
  const groupBy = (array, key) => {

    return array.reduce((result, currentValue) => {

      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );

      return result;
    }, {});
  };


  const groupedByName = groupBy(availablePots, "name")

  const availablePotsIds = availablePots.map((x) => x._id)


  if (product) {
    res.send({
      _id,
      availablePotsIds,
      reviews,
      numReviews,
      displayImages,
      rating,
      images,
      image,
      price,
      discount,
      countInStock,
      name,
      family,
      genericName,
      light, pets,
      water,
      description,
      defaultLink,
      availablePots: groupedByName,
      potsForEditScreen: availablePots,
      tags,
      sortBy
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

})




const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.remove();
    res.json("Product removed");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getBestSellers = asyncHandler(async (req, res) => {
  const product = await Product.find().sort({ views: -1 }).limit(4).select('name images image price displayImages')
  res.send(product)
})

const productsYouMightlike = asyncHandler(async (req, res) => {
  try {
    const pageSize = 4
    function randomNumber(min, max) {
      const r = Math.random() * (max - min) + min
      return Math.floor(r)
    }
    const count = await Product.countDocuments()
    const random = randomNumber(0, count - 4)


    const products = await Product.find().limit(pageSize).skip(random);

    res.json(products);
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.email.split('@')[0],
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    const reduced =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length


    product.rating = reduced > 1 && reduced <= 1.5 ? 1.5 : reduced > 1.5 && reduced <= 2

      ? 2 : reduced > 2 && reduced <= 2.5 ? 2.5 : reduced > 2.5 && reduced <= 3 ? 3
        : reduced > 3 && reduced <= 3.5 ? 3.5 : reduced > 3.5 && reduced <= 4 ? 4 : reduced > 4 && reduced <= 4.5 ? 4.5 : 5

    
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateSort = asyncHandler(async (req, res) => {
  const { sortBy } = req.body
  const sortId = req.params.sort
  const product = await Product.findOne({ sortBy: sortId })
  const restProductUpdate = sortId > sortBy ? await Product.find({ sortBy: { $gte: sortBy, $lt: sortId } }) : await Product.find({ sortBy: { $gt: sortId, $lte: sortBy } })

  product.sortBy = sortBy
  await product.save()
  if (sortId > sortBy) {
    for (let i = 0; i < restProductUpdate.length; i++) {
      const x = restProductUpdate[i];
      x.sortBy = x.sortBy + 1
      await x.save()
    }
  } else {
    for (let i = 0; i < restProductUpdate.length; i++) {
      const x = restProductUpdate[i];
      x.sortBy = x.sortBy - 1
      await x.save()
    }
  }


  res.json({ newSortBy: sortBy })
})

export {
  getBestSellers,
  createOrUpdateProduct,
  getProducts,
  deleteProducts,
  getOneProduct,
  productsYouMightlike,
  createProductReview,
  updateSort
};
