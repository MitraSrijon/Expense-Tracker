package com.srijon.expense_tracker_backend.service;

import com.srijon.expense_tracker_backend.model.Expense;
import com.srijon.expense_tracker_backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    //creating the object of repository interface
    private final ExpenseRepository expenseRepository;

    //dependency injection using constructor
    public ExpenseService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    //Logic of adding an expense
    public Expense addExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    //Logic of getting all the expense from the database
    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    //Logic of finding expense using id
    public Optional<Expense> getExpenseById(Long id){
        return expenseRepository.findById(id);
    }

    //Logic of updating any given expense
    public Expense updateExpense(Long id, Expense expense){

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow();

        existingExpense.setTitle(expense.getTitle());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setExpenseDate(expense.getExpenseDate());
        existingExpense.setCategory(expense.getCategory());
        existingExpense.setDescription(expense.getDescription());
        existingExpense.setPaymentMethod(expense.getPaymentMethod());

        return expenseRepository.save(existingExpense);
    }

    //Logic of deleting any expense from database
    public void deleteExpense(Long id){
        expenseRepository.deleteById(id);
    }

}
