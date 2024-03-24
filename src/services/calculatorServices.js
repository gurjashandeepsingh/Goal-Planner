class Calculators {
  async timetoReachGoal(currentBalance, targetAmount, monthlyContribution) {
    const moneyNeeded = targetAmount - currentBalance;
    const months = moneyNeeded / monthlyContribution;
    let years;
    if (months > 12) {
      years = months / 12;
      years = years.toFixed(1);
    }
    if (months < 12) {
      years = months / 12;
      years = years.toFixed(1);
    }
    return `It will take ${months} months or ${years} years to reach your goal`;
  }

  async totalAmountAfterIntrest(principal, annualIntrest) {
    const totalIntrestAmount = (principal * annualIntrest) / 100;
    const totalAmount = principal + totalIntrestAmount;
    return totalAmount;
  }

  async savingsInMonths(amount, months) {
    const totalAmount = amount * months;
    return totalAmount;
  }

  async savingsInMonthsWithIntrest(
    monthlyContribution,
    targetAmount,
    annualInterestRate
  ) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const months = Math.ceil(
      Math.log(
        targetAmount /
          (targetAmount - monthlyContribution * monthlyInterestRate)
      ) / Math.log(1 + monthlyInterestRate)
    );
    const totalSaved = monthlyContribution * months;
    return { totalSaved };
  }

  async calculateTax(income, deduction) {
    const taxBrackets = [
      { minIncome: 0, maxIncome: 10000, rate: 0.1 },
      { minIncome: 10001, maxIncome: 50000, rate: 0.2 },
      { minIncome: 50001, maxIncome: 100000, rate: 0.3 },
      { minIncome: 100001, maxIncome: Infinity, rate: 0.4 },
    ];
    const taxableIncome = Math.max(income - deduction, 0);
    let totalTax = 0;
    for (const bracket of taxBrackets) {
      const bracketIncome =
        Math.min(taxableIncome, bracket.maxIncome) - bracket.minIncome;
      if (bracketIncome <= 0) break;
      totalTax += bracketIncome * bracket.rate;
    }
    return totalTax;
  }
}

export { Calculators };
