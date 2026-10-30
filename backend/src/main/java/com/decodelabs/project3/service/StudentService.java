package com.decodelabs.project3.service;

import com.decodelabs.project3.entity.Student;
import com.decodelabs.project3.exception.ResourceNotFoundException;
import com.decodelabs.project3.repository.StudentRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;
    public StudentService(StudentRepository repository) { this.repository = repository; }

    public List<Student> getAll() { return repository.findAll(); }
    public Student getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }
    public Student create(Student student) {
        if (repository.existsByEmail(student.getEmail())) throw new IllegalArgumentException("Email is already registered");
        return repository.save(student);
    }
    public Student update(Long id, Student input) {
        Student current = getById(id);
        repository.findByEmail(input.getEmail()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) throw new IllegalArgumentException("Email is already registered");
        });
        current.setName(input.getName()); current.setEmail(input.getEmail());
        current.setCourse(input.getCourse()); current.setSemester(input.getSemester());
        return repository.save(current);
    }
    public void delete(Long id) { repository.delete(getById(id)); }
}
