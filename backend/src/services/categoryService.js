import { getDb } from '../config/database.js'

export function getCategories() {
  return getDb().collection('categories').find({}, { projection: { _id: 0 } }).toArray()
}

export function getCategory(slug) {
  return getDb().collection('categories').findOne({ slug }, { projection: { _id: 0 } })
}

export function updateCategoryImages(slug, images, image, imageKitFiles) {
  return getDb().collection('categories').updateOne(
    { slug },
    { $set: { images, image, imageKitFiles } },
  )
}

export function updateCategoryHeroImage(slug, image) {
  return getDb().collection('categories').updateOne(
    { slug },
    { $set: { image } },
  )
}
