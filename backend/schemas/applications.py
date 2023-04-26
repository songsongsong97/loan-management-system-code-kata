from extensions import ma


class ApplicationsSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "company",
            "applicationProvider",
            "yearEstablished",
            "profitOrLoss",
            "loanAmount",
            "status",
            "createdAt",
        )
