package cn.itcast.bookmanager.model;

import java.math.BigDecimal;

public class Book {
    private String name;

    private int typeId;
    private int stock;
    private String publisher;
    private String description;
    private Integer bookId;
    private String bookName;
    private String author;
    private Integer status;  //×´Ì¬ 1ÉÏ¼Ü  2ÏÂ¼Ü
    private Integer bookTypeId;
    private String publish;
    private Integer number;  //¿â´æ
    private double price;
    private String remark;

    public Book(String name, String author, Object id, int stock, BigDecimal price, String publisher, String desc) {
    }

    public Integer getBookId() {
           return bookId;
         }
    public void setBookId(Integer bookId) {
              this.bookId = bookId;
           }
   public String getBookName() {
              return bookName;
           }
   public void setBookName(String bookName) {
              this.bookName = bookName;
           }
   public String getAuthor() {
              return author;
           }
    public void setAuthor(String author) {
              this.author = author;
           }
   public String getRemark() {
              return remark;
           }
   public void setRemark(String remark) {
              this.remark = remark;
           }
   public Integer getStatus() {
              return status;
           }
   public void setStatus(Integer status) {
              this.status = status;
           }
    public Integer getBookTypeId() {
              return bookTypeId;
           }
   public void setBookTypeId(Integer bookTypeId) {
              this.bookTypeId = bookTypeId;
           }
   public String getPublish() {
              return publish;
           }
   public void setPublish(String publish) {
              this.publish = publish;
           }
   public Integer getNumber() {
              return number;
           }
           public void setNumber(Integer number) {
              this.number = number;
           }
   public double getPrice() {return price;}
   public void setPrice(double price) {
              this.price = price;
           }

}
