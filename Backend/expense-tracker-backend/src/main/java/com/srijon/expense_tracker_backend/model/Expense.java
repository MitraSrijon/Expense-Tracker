package com.srijon.expense_tracker_backend.model;

import com.srijon.expense_tracker_backend.model.enums.Category;
import com.srijon.expense_tracker_backend.model.enums.PaymentMethod;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @NotBlank
    private String title;

    @Positive
    private BigDecimal amount;

    @NotNull
    private LocalDate expenseDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Category category;

    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

}
