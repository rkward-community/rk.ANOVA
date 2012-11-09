local({
## Berechne
	num.cases <- nrow(sample.data.frame)
	anova.conditions <- c("cond1", "cond2")
	num.conditions <- length(anova.conditions)

	anova.data <- data.frame(
		response=c(
			sample.data.frame[["cond1"]],
			sample.data.frame[["cond2"]]),
		condition=factor(rep(anova.conditions, each=num.cases)),
		subjects=factor(rep(sample.data.frame[["subjects"]], times=num.conditions)),
		stringsAsFactors=FALSE)

## Drucke Ergebnisse
rk.header("Prepare within subject data results")
	rk.print(summary(anova.data))
.GlobalEnv$anova.data <- anova.data
})
