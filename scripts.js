document.getElementById('insuranceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = new FormData(event.target);

    // Collecting form data
    const surname = formData.get('surname');
    const givenName = formData.get('givenName');
    const taxId = formData.get('taxId');
    const gender = formData.get('gender');
    const birthDate = formData.get('birthDate');
    const maritalStatus = formData.get('maritalStatus');
    const occupation = formData.get('occupation') || 'UNKNOWN';

    const homePhone = formData.get('homePhone');
    const businessPhone = formData.get('businessPhone');
    const cellPhone = formData.get('cellPhone');
    const email = formData.get('email');

    // Creating XML data
    let xmlData = `<ACORD>
<SignonRq>
<SignonPswd>
<SignonRoleCd>Agent</SignonRoleCd>
<!-- You can add more details here -->
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
<!-- Personal Details -->
<PersApplicationInfo>
<InsuredOrPrincipal>
<GeneralPartyInfo>
<NameInfo>
<PersonName>
<Surname>${surname}</Surname>
<GivenName>${givenName}</GivenName>
</PersonName>
<TaxIdentity>
<TaxIdTypeCd>SSN</TaxIdTypeCd>
<TaxId>${taxId}</TaxId>
</TaxIdentity>
</NameInfo>
<Communications>
<PhoneInfo>
<CommunicationUseCd>Home</CommunicationUseCd>
<PhoneNumber>${homePhone}</PhoneNumber>
</PhoneInfo>
<PhoneInfo>
<CommunicationUseCd>Business</CommunicationUseCd>
<PhoneNumber>${businessPhone}</PhoneNumber>
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

</PersPkgPolicyQuoteInqRq>
</InsuranceSvcRq>
</ACORD>`;

    // Create a Blob object and open it in a new tab
    const blob = new Blob([xmlData], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
});

function generateUniqueId() {
    return 'xxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
