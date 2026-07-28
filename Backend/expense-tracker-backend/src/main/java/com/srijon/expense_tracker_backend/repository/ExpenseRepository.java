package com.srijon.expense_tracker_backend.repository;

import com.srijon.expense_tracker_backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense , Long> {
}
