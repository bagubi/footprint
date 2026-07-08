//定义一个接口用于，用于限制person对象的属性和类型
// 第一种暴露方式：分别暴露（在前面加export）
export interface PersonInter {
  // interface:是接口
  id: string;
  name: string;
  age: number;
}
// 有3种暴露方式
// 第二种暴露方式：默认暴露
// export default PersonInter;//❌ 接口不能默认导出（TypeScript 限制）

// 第三种暴露方式：统一暴露
// export { PersonInter };

//一个自定义类型（两种写法）
// export type Persons = Array<PersonInter>;
// 注：Array<PersonInter>:叫做泛型

export type Persons = PersonInter[];
