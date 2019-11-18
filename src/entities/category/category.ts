export class Category {
  static convert(category: any) : Category {
    category = Object.assign(category, Category);
    return category;
  }
}
