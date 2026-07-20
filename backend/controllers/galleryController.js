export const getGalleryImages = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 12;

    const skip = (page - 1) * limit;

    const total = await Gallery.countDocuments({
      temple: req.params.templeId,
    });

    const images = await Gallery.find({
      temple: req.params.templeId,
    })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,

      currentPage: page,

      totalPages: Math.ceil(total / limit),

      images,
    });
  } catch (error) {
    next(error);
  }
};
