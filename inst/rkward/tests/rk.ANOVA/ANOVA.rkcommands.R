local({
## Vorbereiten
suppressMessages(require(ez))
## Berechne
	anova.results <- ezANOVA(
		data=anova.data,
		dv=.(response),
		wid=.(subjects),
		within=.(condition),
		detailed=TRUE,
		return_aov=TRUE)

## Drucke Ergebnisse
rk.header("ANOVA results")
rk.print(anova.results[["ANOVA"]])
	if("Mauchly's Test for Sphericity" %in% names(anova.results)){
		rk.header("Mauchly's Test for Sphericity", level=3)
		rk.print(anova.results[["Mauchly's Test for Sphericity"]])
	} else {}
	if("Sphericity Corrections" %in% names(anova.results)){
		rk.header("Sphericity Corrections", level=3)
		rk.print(anova.results[["Sphericity Corrections"]])
	} else {}
	if("Levene's Test for Homgeneity" %in% names(anova.results)){
		rk.header("Levene's Test for Homgeneity", level=3)
		rk.print(anova.results[["Levene's Test for Homgeneity"]])
	} else {}
})
