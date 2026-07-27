package com.srijon.expense_tracker_backend.model;

import com.srijon.expense_tracker_backend.model.enums.Category;
import com.srijon.expense_tracker_backend.model.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private BigDecimal amount;
    private LocalDate expenseDate;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String description;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

}
