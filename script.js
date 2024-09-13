document.getElementById('insuranceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = new FormData(event.target);

    // Collecting form data
    const mainDriverLastName = formData.get('surname');
    const mainDriverFirstName = formData.get('givenName');
    const gender = formData.get('gender');
    const birthDate = formData.get('birthDate');
    const maritalStatus = formData.get('maritalStatus');
    const occupation = formData.get('occupation') || 'UNKNOWN';
    const homePhone = formData.get('homePhone');
    const cellPhone = formData.get('cellPhone');
    const email = formData.get('email');
    const vehicleVin = formData.get('vehicleVin');
    const coverageComp = formData.get('coverageComp');
    const coverageColl = formData.get('coverageColl');
    const coverageRreim = formData.get('coverageRreim') ? 'YES' : 'NO';

    // Creating XML data
    let xmlData = `<ACORD>
<SignonRq>
<SignonPswd>
<SignonRoleCd>Agent</SignonRoleCd>
</SignonPswd>
<ClientDt/>
<CustLangPref>en-US</CustLangPref>
<ClientApp>
<Org>SEMCAT Corporation</Org>
<Name>SEMCAT</Name>
<Version>5.3.13</Version>
</ClientApp>
</SignonRq>
<InsuranceSvcRq>
<RqUID>${generateUniqueId()}</RqUID>
<PersPkgPolicyQuoteInqRq>
<PersApplicationInfo>
<InsuredOrPrincipal>
<GeneralPartyInfo>
<NameInfo>
<PersonName>
<Surname>${mainDriverLastName}</Surname>
<GivenName>${mainDriverFirstName}</GivenName>
</PersonName>
</NameInfo>
<Communications>
<PhoneInfo>
<CommunicationUseCd>Home</CommunicationUseCd>
<PhoneNumber>${homePhone}</PhoneNumber>
</PhoneInfo>
<PhoneInfo>
<CommunicationUseCd>Cell</CommunicationUseCd>
<PhoneNumber>${cellPhone}</PhoneNumber>
</PhoneInfo>
<EmailInfo>
<EmailAddr>${email}</EmailAddr>
</EmailInfo>
</Communications>
</GeneralPartyInfo>
<InsuredOrPrincipalInfo>
<PersonInfo>
<GenderCd>${gender}</GenderCd>
<BirthDt>${birthDate}</BirthDt>
<MaritalStatusCd>${maritalStatus}</MaritalStatusCd>
<OccupationClassCd>${occupation}</OccupationClassCd>
</PersonInfo>
</InsuredOrPrincipalInfo>
</InsuredOrPrincipal>
</PersApplicationInfo>

<PersVeh id="VEHICLE1">
<VehIdentificationNumber>${vehicleVin}</VehIdentificationNumber>
<Coverage>
<CoverageCd>COMP</CoverageCd>
<Deductible>
<FormatInteger>${coverageComp}</FormatInteger>
</Deductible>
</Coverage>
<Coverage>
<CoverageCd>COLL</CoverageCd>
<Deductible>
<FormatCurrencyAmt>
<Amt>${coverageColl}</Amt>
</FormatCurrencyAmt>
</Deductible>
</Coverage>
<Coverage>
<CoverageCd>RREIM</CoverageCd>
</Coverage>
</PersVeh>

</PersPkgPolicyQuoteInqRq>
</InsuranceSvcRq>
</ACORD>`;

    console.log("Generated XML: ", xmlData); // Debugging: Log the XML data

    // Create the XML blob and trigger download
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'insuranceData.xml';
    document.body.appendChild(a); // Append the anchor to the DOM for Firefox
    a.click();
    URL.revokeObjectURL(url);
    a.remove(); // Remove the anchor after download

    // Open the user's email client and fill in recipient and subject
    const mailRecipient = "onuser5015@gmail.com";
    const mailSubject = "Insurance XML Data";
    const mailBody = encodeURIComponent("Please find the attached XML file with insurance data.\n\nYou can manually attach the XML file from your downloads.");
    const mailtoLink = `mailto:${mailRecipient}?subject=${mailSubject}&body=${mailBody}`;
    window.location.href = mailtoLink; // Opens default email client with recipient
});

function generateUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
