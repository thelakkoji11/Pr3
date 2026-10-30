package com.decodelabs.project3.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "students", uniqueConstraints = @UniqueConstraint(name = "uk_student_email", columnNames = "email"))
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String name;

    @NotBlank @Email @Size(max = 120)
    @Column(nullable = false, length = 120, unique = true)
    private String email;

    @NotBlank @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String course;

    @NotNull @Min(1) @Max(8)
    @Column(nullable = false)
    private Integer semester;

    public Student() {}
    public Student(String name, String email, String course, Integer semester) {
        this.name = name; this.email = email; this.course = course; this.semester = semester;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
}
