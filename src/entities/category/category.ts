export class Category {
  static convert(category: any) : Category {
    category = Object.assign(new Category(), category);
    return category;
  }
}
