import React, { useState, useEffect } from 'react';
import '../css/form.css';
import '../css/gai.css';
import '../pages/components/components.css';
import DataService from '../services/GaiService';
import CommonService from '../services/CommonService';
import GaiMain from './GaiMain';
import DatePicker from 'react-datepicker';
import dateFormat from "dateformat";
import GaiService from '../services/GaiService';
import InsuranceTable from './components/InsuranceTable';
import { connect } from 'react-redux';

import { format, parse } from 'date-fns';
import configData from "../config/urls.json";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedClaimInsurance } from '../redux/actions/mciAction';

const MedClaimInsurance = (props) => {
    // State variables
    const [financialYearOptions, setFinancialYearOptions] = useState([]);
    const [financialYear, setFinancialYear] = useState((new Date().getFullYear())+'-'+(new Date().getFullYear()+1));
    const [name, setName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [deptSection, setDeptSection] = useState('');
    const [extNo, setExtNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [netSalary, setNetSalary] = useState('');
    const [employmentCategory, setEmploymentCategory] = useState('');  
    const [existingMedClaim, setExistingMedClaim] = useState('');
    const [familyFloaterList, setFamilyFloaterList] = useState([]);
    const [familyFloater, setFamilyFloater] = useState('');
    const [familyFloaterforNonDepParents, setFamilyFloaterforNonDepParents] = useState('');
    const [familyFloaterforNonDepParentsInlaws, setFamilyFloaterforNonDepParentsInlaws] = useState('');
    const [dependentRows, setDependentRows] = useState([]);
    const [nonDependentParentRows, setNonDependentParentRows] = useState([]);
    const [nonDependentParentInLawsRows, setNonDependentParentInLawsRows] = useState([]);
    const [relationList, setRelationList] = useState([]);
    const [dependentCategoryList, setDependentCategoryList] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [totalSumInsured, setTotalSumInsured] = useState(0);
    const [totalPremium, setTotalPremium] = useState(0);
    const [nonDepParentsSumInsured, setNonDepParentsSumInsured] = useState(0);
    const [nonDepParentsPremium, setNonDepParentsPremium] = useState(0);
    const [nonDepParentInlawsSumInsured, setNonDepParentInlawsSumInsured] = useState(0);
    const [nonDepParentsInlawsPremium, setNonDepParentsInlawsPremium] = useState(0);
    const [deductFromReimbursement, setDeductFromReimbursement] = useState(false);
    const [deductFromReimbursementAmount, setDeductFromReimbursementAmount] = useState(0);
    const [deductFromSalary, setDeductFromSalary] = useState(false);
    const [deductFromSalaryAmount, setDeductFromSalaryAmount] = useState(0);
    const [deductThroughCheque, setDeductThroughCheque] = useState(false);
    const [chequeAmount, setChequeAmount] = useState(0);
    const [chequeNo, setChequeNo] = useState('');
    const [chequeDate, setChequeDate] = useState('');
    const [bank, setBank] = useState('');
    const [witnessName, setWitnessName] = useState('');
    const [signedDate, setSignedDate] = useState('');
    
    //const [dependentsPolicies, setDependentsPolicies] = useState([]);
    const [selectedDependentsPolicies, setSelectedDependentsPolicies] = useState([]);
    const [selectedNonDepParentsPolicies, setSelectedNonDepParentsPolicies] = useState([]);
    const [selectedNonDepParentInLawsPolicies, setSelectedNonDepParentInLawsPolicies] = useState([]);
    const [policyConfigList, setPolicyConfigList] = useState([]);

    const [masterMemCategory, setMasterMemCategory] = useState(0);

    const [totalPremiumTemp, setTotalPremiumTemp] = useState(deductFromReimbursementAmount+deductFromSalaryAmount+chequeAmount);
    const [update, setUpdate] = useState(false);
    const [medInsId, setMedInsId] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [existingPolicyData, setExistingPolicyData] = useState([]);

    const [premiumForMember, setPremiumForMember] = useState(0);
    const [premiumForDepMember, setPremiumForDepMember] = useState(0);
    const [premiumForDepParent, setPremiumForDepParent] = useState(0);
    const [premiumForNonDepFirstParent, setPremiumForNonDepFirstParent] = useState(0);
    const [premiumForNonDepSecondParent, setPremiumForNonDepSecondParent] = useState(0);
    const [premiumForNonDepInLawsFirstParent, setPremiumForNonDepInLawsFirstParent] = useState(0);
    const [premiumForNonDepInLawsSecondParent, setPremiumForNonDepInLawsSecondParent] = useState(0);

    const [totalPremiumToPay, setTotalPremiumToPay] = useState(0);
    
    //const existingData = useSelector((state) => state.mciReducer);
    //const [dataMCI, setDataMci] = useState([]);
    const dispatch = useDispatch();
    const dataMCI = useSelector((state) => state.mciReducer.data);
    
    const existingMedClaims = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
    ];
    // Fetch financial year options
    useEffect(() => {
        setEmployeeCode(props.userId);
        //Simulated API call or data retrieval
        const fetchFinancialYearOptions = () => {
        // Replace with your own logic to fetch the financial year options
        const currentYear = new Date().getFullYear() + 2;
        const startYear = 2024; // Change the year range as per your requirement
        const endYear = currentYear - 1;
        const options = [];
        for (let year = endYear; year >= startYear; year--) {
            options.push(`${year - 1}-${year}`);
        }  
        setFinancialYearOptions(options);
        setFinancialYear(options[0]); // Set default option
        };  

        /*const fetchData = async () => {
            dispatch(fetchMedClaimInsurance(financialYear, props.userId));
            await fetchPolicyData();        
            fetchEmpData();
            console.log(dataMCI);
            await fetchEmpDependantData();
            fetchFinancialYearOptions();
            fetchSumInsuredData();
            fetchRelationLookup();
            fetchDependentCategoryLookUp();        
            fetchPolicyConfiguration();            
        };*/
        const fetchData = async () => {
            dispatch(fetchMedClaimInsurance(financialYear, props.userId));          
            const policyData = await fetchPolicyData();
            console.log("Policy Data returns "+policyData)
            if (policyData && policyData.length > 0) {
              // fetchEmpDependantData and other fetch functions if policyData has data
              //console.log("AA");
              console.log(dataMCI)
              fetchEmpData();
              fetchEmpDependantData();
              fetchFinancialYearOptions();
              fetchSumInsuredData();
              fetchRelationLookup();
              fetchDependentCategoryLookUp();
              fetchPolicyConfiguration();
            } else {
              // fetchEmpData and other fetch functions if policyData is empty or null
              console.log("BB");
              fetchEmpData();
              fetchEmpDependantData();
              fetchFinancialYearOptions();
              fetchSumInsuredData();
              fetchRelationLookup();
              fetchDependentCategoryLookUp();
              fetchPolicyConfiguration();
            }
          };
        fetchData();
    }, []);
    
 
    /*useEffect(() => {
        if (dataMCI) {
          console.log("QWEERRRRRRRRRR" + JSON.stringify(dataMCI));
          // Call other functions that rely on the updated value of dataMCI
          setSelectedDependentsPolicies(dataMCI.length > 0 ? dataMCI[0].policyDetails : []);
        }
      }, [dataMCI]);
*/
    // Handle financial year change 
    const handleFinancialYearChange = (event) => {
        setFinancialYear(event.target.value);
        fetchSumInsuredData();
    };

    // Fetch sum insured data
    const fetchSumInsuredData = async () => {
        try {
        const response = await DataService.getSumInsuredDataByYear(financialYear);
        setFamilyFloaterList(response.data);
        } catch (error) {
        console.error('Error fetching Data:', error);
        }
    };
    // Fetch Relation data
    const fetchRelationLookup = async () => {
        try {
        const response = await CommonService.getLookupDetailByLookupId(1);
        setRelationList(response.data);
        //console.log("Relation: ", JSON.stringify(response.data));
        } catch (error) {
        console.error('Error fetching Relation Data:', error);
        }
    };

    

    //let dataMCI = useSelector((state) => state.mciReducer.data);
    //console.log("Store Data  "+JSON.stringify(dataMCI));  
    //console.log("Store Data  "+JSON.stringify(dataMCI[0].policyDetails));

    /*const parsedData = JSON.parse(dataMCI);
    const policyDetails = parsedData.data[0].policyDetails;
    console.log("Store Data  "+policyDetails);  */
    //setSelectedDependentsPolicies(JSON.stringify(dataMCI.data.policyDetails));
    // Fetch Med Insurance Policy Data 
    const fetchPolicyData = async () => {
    try {    
        const response = await DataService.getMedClaimInsuranceByFinYearEmpCode(financialYear,props.userId);
        //setSelectedDependentsPolicies(dataMCI && dataMCI.length > 0 ? dataMCI[0].policyDetails : []);
        setExistingPolicyData(response.data);
        console.log("Response Dat--- "+response.data)
        if(response.data.length>0)
        {
            setUpdate(true);
            setShowButton(true);
            setMedInsId(response.data[0].medclaimInsId);
            setExistingMedClaim(response.data[0].existingMember);
            setFamilyFloater(response.data[0].totalSumInsured);
            setFamilyFloaterforNonDepParents(response.data[0].nonDepParentsSumInsured);
            setFamilyFloaterforNonDepParentsInlaws(response.data[0].nonDepParentInlawsSumInsured);
    
            setPremiumForMember(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].totalSumInsured, 'premiumToPay'));
            setPremiumForDepMember(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].totalSumInsured, 'premiumToPayDep'));
            setPremiumForDepParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].totalSumInsured, 'premiumToPayDepParent'));		
            setPremiumForNonDepFirstParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].nonDepParentsSumInsured, 'premiumToPayNonDep'));
            setPremiumForNonDepSecondParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].nonDepParentsSumInsured, 'premiumToPayAddon1'));
            setPremiumForNonDepInLawsFirstParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].nonDepParentInlawsSumInsured, 'premiumToPayNonDep'));
            setPremiumForNonDepInLawsSecondParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].nonDepParentInlawsSumInsured, 'premiumToPayAddon1'));
    
            setDeductFromReimbursement(response.data[0].deductFromReimbursement)
            setDeductFromReimbursementAmount(response.data[0].reimbursementAmount)
            setDeductFromSalary(response.data[0].deductFromSalary)
            setDeductFromSalaryAmount(response.data[0].deductionSalaryAmount)
            setDeductThroughCheque(response.data[0].deductThroughCheque)
            setChequeAmount(response.data[0].chequeAmount)
            setChequeNo(response.data[0].chequeNo)
            setChequeDate(dateFormat(response.data[0].chequeDate, "dd-mm-yyyy") )
            setBank(response.data[0].bank)
            setTotalSumInsured(response.data[0].totalSumInsured)
            setTotalPremium(response.data[0].totalPremium)
            setNonDepParentsSumInsured(response.data[0].nonDepParentsSumInsured)
            setNonDepParentsPremium(response.data[0].nonDepParentsPremium)
            setNonDepParentInlawsSumInsured(response.data[0].nonDepParentInlawsSumInsured)
            setNonDepParentsInlawsPremium(response.data[0].nonDepParentsInlawsPremium)

            /*let abc = getPremiumForSelectedFloater(policyConfigList,employmentCategory, response.data[0].totalSumInsured, 'premiumToPay')
            
            setPremiumForMember(abc);
            
            console.log("Premium  "+abc)

            console.log("Premium ---"+premiumForMember)*/
            setPremiumForMember(response.data[0].memberPremium)
            setPremiumForDepMember(response.data[0].spouseChildrenPremium);
            setPremiumForDepParent(response.data[0].depParentsPremium);            
            setPremiumForNonDepFirstParent(response.data[0].nobDepParent1Premium);
            setPremiumForNonDepSecondParent(response.data[0].nobDepParent2Premium);
            setPremiumForNonDepInLawsFirstParent(response.data[0].nobDepParentInlaw1Premium);
            setPremiumForNonDepInLawsSecondParent(response.data[0].nobDepParentInlaw2Premium);
            
    
            setTotalPremiumToPay(response.data[0].totalPremium+response.data[0].nonDepParentsPremium+response.data[0].nonDepParentsInlawsPremium)
            //console.log(response.data[0].totalPremium+response.data[0].nonDepParentsPremium+response.data[0].nonDepParentsInlawsPremium+"========"+totalPremiumToPay)
            setWitnessName(response.data[0].witnessName)
            setSignedDate(dateFormat(response.data[0].signedDate, "dd-mm-yyyy"));      
            //console.log(JSON.stringify(dataMCI[0].policyDetails));
            //setSelectedDependentsPolicies(existingData.policyDetails);
            //dispatch(JSON.stringify(response.data[0].policyDetails));
            //console.log(selectedDependentsPolicies);*/
            return response.data;
        }
        else{
            return [];
        }       

        } catch (error) {
            console.error('No Data',error);
            return [];
        }
    };
    
    // Fetch Dependent Category data
    const fetchDependentCategoryLookUp = async () => {
        try {
        const response = await CommonService.getLookupDetailByLookupId(4);
        setDependentCategoryList(response.data);
        //console.log("DEPPPPPPPPPPPPPPPP----"+JSON.stringify(response.data))
        } catch (error) {
        console.error('Error fetching Dependent Category Data:', error);
        }
    };
    
    // Fetch Policy Configuration data
    const fetchPolicyConfiguration = async () => {
        try {
        const response = await GaiService.getMedClaimInsuranceConfigDetailBasedOnFinYear(financialYear);
        setPolicyConfigList(response.data);      
        //console.log("Policy Data ----"+JSON.stringify(response.data))
        } catch (error) {
        console.error('Error fetching Policy Data:', error);
        }
    };

    // Fetch Employee data
    const fetchEmpData = async () => {
        const empData = await DataService.getGaiEmployeeById(props.userId);//135865
        //console.log(JSON.stringify(empData));
        setEmployeeCode(empData.data.emp_code);
        setName(empData.data.emp_name);
        setExtNo(empData.data.off_tel_extension);
        setMobile(empData.data.mobile);
        setDob(dateFormat(empData.data.dob, "dd-mm-yyyy"));
        setDesignation(empData.data.erdc_design);
        setDeptSection(empData.data.dept_shortname);
        setNetSalary(empData.data.total);
        setEmploymentCategory(empData.data.employment_category);
    }

    // Fetch Dependent Data
    const fetchEmpDependantData = () => {
        DataService.getGaiEmpDependants(props.userId)
          .then(empDepData => {
            console.log("DEPD LIST " + JSON.stringify(empDepData.data));
            const finalRows = [];
            const nonDependentParentRows = [];
            const nonDependentParentInLawsRows = [];
            const filteredSelectedDependentsPolicies = [];
      
            for (let index = 0; index < empDepData.data.length; index++) {
              const dependent = empDepData.data[index];
              const dependentCategory = dependent.whether_depend_or_not;
              const dependentCategoryText = dependentCategory === 'D' || dependentCategory === null ? 'Yes' : 'No';
              let isChecked = dependent.med_claim_allowed === 'P';
      
              // Check if the dependent matches the selected policy details
              for (let i = 0; i < selectedDependentsPolicies.length; i++) {
                if (
                  dependent.relation === selectedDependentsPolicies[i].name &&
                  dependent.dependant_name === selectedDependentsPolicies[i].relation.detailCode
                ) {
                  isChecked = true;
                  break;
                }
              }
      
              const row = {
                slNo: index + 1,
                name: dependent.dependant_name,
                dob: dateFormat(dependent.depend_dob, "dd-mm-yyyy"),
                relation: dependent.relation,
                dependentCategory: dependentCategoryText,
                depCategory: getParentCodeByDetailCode(dependent.relation),
                memberCategory: masterMemCategory,
                relationId: getIdByDetailCode(dependent.relation),
                isChecked: isChecked,
              };
      
              if (dependentCategory === 'N') {
                if (dependent.relation === 'Father' || dependent.relation === 'Mother') {
                  nonDependentParentRows.push(row);
                } else if (dependent.relation === 'Father In Law' || dependent.relation === 'Mother In Law') {
                  nonDependentParentInLawsRows.push(row);
                }
              } else {
                finalRows.push(row);
                if (dependent.whether_depend_or_not !== 'N' && dependent.med_claim_allowed === 'P') {
                  const selectedRelation = relationList.find(relation => relation.detailCode === dependent.relation);
                  let memberDepdCategory;
                  if (['Son', 'Wife', 'Daughter', 'Husband'].includes(dependent.relation)) {
                    memberDepdCategory = 30;
                  } else if (['Mother', 'Father', 'Father In Law', 'Mother In Law'].includes(dependent.relation)) {
                    memberDepdCategory = 31;
                  }
                  if (selectedRelation) {
                    filteredSelectedDependentsPolicies.push({
                      name: dependent.dependant_name,
                      dob: dependent.depend_dob,
                      relation: { id: selectedRelation.id },
                      memberCategory: { id: memberDepdCategory },
                      sumInsured: familyFloater,
                      premiumAmount: memberDepdCategory === 31 ? premiumForDepParent : premiumForDepMember,
                      remarks: ""
                    });
                  } else {
                    console.error("Selected relation not found for detailCode:", dependent.relation);
                    // Handle the error or provide a default object
                  }
                }
              }
            }
      
            console.log(finalRows);
            setDependentRows(finalRows);
            setNonDependentParentRows(nonDependentParentRows);
            setNonDependentParentInLawsRows(nonDependentParentInLawsRows);
            console.log(filteredSelectedDependentsPolicies);
            setSelectedDependentsPolicies(filteredSelectedDependentsPolicies);
          })
          .catch(error => {
            console.error('Error fetching Employee Dependent Data:', error);
          });
      };
      
      console.log(selectedDependentsPolicies);
      
    
    const getParentCodeByDetailCode = (detailCode) => {
        const relation = relationList.find((relation) => relation.detailCode === detailCode);
        if (relation) {
        const category =  getDetailCodeById(relation.parentCode);
        //console.log(relation.parentCode+"category"+category)
        return category;
        }
        return null; // Return null if the relation is not found
    };

    const getDetailCodeById = (id) => {
        const dependentCategory = dependentCategoryList.find((category) => category.id === id);
        if (dependentCategory) {
            
        return dependentCategory.detailCode;
        } 
        return null; // Return null if the dependent category is not found
    };

    const getIdByDetailCode = (detailCode) => {
        const relation = relationList.find((relation) => relation.detailCode === detailCode);
        if (relation) {        
        return relation.id;
        } 
        return null; // Return null if the dependent category is not found
    };

  const [showAlert, setShowAlert] = useState(false);
  // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {   
            //console.log(existingMedClaim) 
            if (existingMedClaim === 'Select' || existingMedClaim === '') {
                // Field is not selected, handle the error or validation logic
                alert('Whether member of existing Mediclaim Scheme of the Centre?');
                return;
            }
            if (document.getElementById("familyFloater").value === 'Select' || document.getElementById("familyFloater").value === '') {
                // Field is not selected, handle the error or validation logic
                alert('Select Family Floater Opted for ');
                return;
            }
            if(Number(totalPremium)<Number(deductFromReimbursementAmount)){
                alert('Maximum amount allowed in reimbursement is the premium for Self and Dependents');
                return;
            }
            //console.log(totalPremium)
            //console.log(chequeAmount+deductFromReimbursementAmount+deductFromSalaryAmount)
            if(Number(totalPremiumToPay)!=Number(Number(chequeAmount)+Number(deductFromReimbursementAmount)+Number(deductFromSalaryAmount))){
                alert('Total Premium to Pay and Total Premium Amount Mismatch!!!');
                return;
            }
             console.log("selectedDependentsPolicies"+JSON.stringify(selectedDependentsPolicies));
             console.log("selectedNonDepParentsPolicies"+JSON.stringify(selectedNonDepParentsPolicies));
             console.log("selectedNonDepParentInLawsPolicies"+JSON.stringify(selectedNonDepParentInLawsPolicies));
            const mergedPolicies = [
                ...selectedDependentsPolicies,
                ...selectedNonDepParentsPolicies,
                ...selectedNonDepParentInLawsPolicies
            ];

            //console.log("Submit selectedDependentsPolicies "+JSON.stringify(selectedDependentsPolicies)) 
            //console.log("Submit selectedDependentsPolicies "+JSON.stringify(mergedPolicies)) 
            //  console.log('Form submitted');            
                const data = {
                finYear: financialYear,
                empCode: employeeCode,
                empName: name,
                extNo:extNo,
                mobile: mobile,
                dob: dob,
                designationGrade: designation,
                deptSection: deptSection,
                monthlyGross: netSalary,
                existingMember: existingMedClaim,
                signedDate: signedDate,//dateFormat(signedDate, "dd-mm-yyyy"),
                witnessName: witnessName,
                totalSumInsured: totalSumInsured,
                totalPremium: totalPremium,
                nonDepParentsSumInsured: nonDepParentsSumInsured,
                nonDepParentsPremium: nonDepParentsPremium,
                nonDepParentInlawsSumInsured: nonDepParentInlawsSumInsured,
                nonDepParentsInlawsPremium: nonDepParentsInlawsPremium,
                chequeNo: chequeNo,
                chequeDate: chequeDate,//dateFormat(chequeDate, "dd-mm-yyyy"),
                bank: bank,
                chequeAmount: chequeAmount,
                deductionSalaryAmount: deductFromSalaryAmount,
                reimbursementAmount: deductFromReimbursementAmount,
                deductFromReimbursement: deductFromReimbursement,
                deductFromSalary: deductFromSalary,
                deductThroughCheque: deductThroughCheque,
                memberPremium:premiumForMember,
                spouseChildrenPremium:premiumForDepMember,
                depParentsPremium:premiumForDepParent == null ? 0 :premiumForDepParent, 
                nobDepParent1Premium:premiumForNonDepFirstParent,
                nobDepParent2Premium:premiumForNonDepSecondParent,
                nobDepParentInlaw1Premium:premiumForNonDepInLawsFirstParent,
                nobDepParentInlaw2Premium:premiumForNonDepInLawsSecondParent,
                spouseChildSumInsured:totalSumInsured,//spouseChildSumInsured
                depParentsSumInsured:totalSumInsured, //depParentsSumInsured
                policyDetails: mergedPolicies
            };
            console.log('Form submitted'+JSON.stringify(data));
            if (update === true) {
                try {
                // Call the deleteMedClaimInsuranceDetailById function
                await DataService.deleteMedClaimInsuranceDetailById(medInsId);
                //console.log("Successfully deleted insurance detail");
                // Call the updateMedClaimInsurance function
                const res = await DataService.updateMedClaimInsurance(medInsId, data);
                //console.log("Successfully updated insurance record");
                // console.log("Response:", res.data);
                alert('Successfully Updated Record');
                } catch (error) {
                console.error("Error:", error);
                // Handle error appropriately
                }
            }
            else {
                //console.log("About to Sava");
                setShowButton(true);
                let res = await fetch(
                    DataService.saveMedClaimInsurance(data).then(res => {
                    //console.log("*****************"+res.data.medclaimInsId+"*******************");
                    //document.getElementById("printBtn").disabled = false;
                    setMedInsId(res.data.medclaimInsId);
                    setUpdate(true);
                    alert('Successfully Saved Record')
                }))
            }
        } catch (error) {
            console.log(error);
        }
        // Perform your form submission or data handling here
    }

    // Function to handle the change in familyFloater value
    const handleFamilyFloaterChange = (value) => {
            //console.log(JSON.stringify(policyConfigList)+"familyFloater --------"+value)
            setPremiumForMember(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPay'));
            setPremiumForDepMember(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPayDep'));
            setPremiumForDepParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPayDepParent'));
            //console.log("1="+premiumForMember+"2="+premiumForDepMember+"3= "+premiumForDepParent);
            setFamilyFloater(value);
            setTotalSumInsured(value);
            calculatePremium(selectedDependentsPolicies);
    };
    
    const handleFamilyFloaterForNonDepParentsChange = (value) => {
            //console.log("familyFloater --------"+value)
            setPremiumForNonDepFirstParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPayNonDep'));
            setPremiumForNonDepSecondParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPayAddon1'));
            //console.log("1="+premiumForNonDepFirstParent+"2="+premiumForNonDepSecondParent);
            setFamilyFloaterforNonDepParents(value);
            setNonDepParentsSumInsured(value);
            calculatePremiumForNonDepParents(selectedNonDepParentsPolicies);
    };

    const handleFamilyFloaterForNonDepParentsInLawsChange = (value) => {
        // console.log("familyFloater --------"+value)
            setPremiumForNonDepInLawsFirstParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPayNonDep'));
            setPremiumForNonDepInLawsSecondParent(getPremiumForSelectedFloater(policyConfigList,employmentCategory, value, 'premiumToPayAddon1'));
            //console.log("1="+premiumForNonDepInLawsFirstParent+"2="+premiumForNonDepInLawsSecondParent);
            setFamilyFloaterforNonDepParentsInlaws(value);
            setNonDepParentInlawsSumInsured(value);
            calculatePremiumForNonDepParentsInLaws(selectedNonDepParentInLawsPolicies);
    };

    const printMedClaimInsurance = (e) => {
        e.preventDefault();
        //console.log("Testing"+employmentCategory);
        if (employeeCode == '' || employeeCode == null) {
        alert("For Employees Only");
        return;
        }
        else {
            var reportParam = "empCode:S:" + employeeCode+";finYear:S:"+financialYear+";header:S:"+employmentCategory;
            var report = "medClaimInsurance.jasper";
            var variables = {
            REPORT_PATH: report,
            OUTPUT_FILE: "medClaimInsurance.pdf",
            PARAMETERS: reportParam
            };
            var qrString = "User_Id=" + props.userId + "&" + "REPORT_PATH=" + variables.REPORT_PATH + "&" + "OUTPUT_FILE=" + variables.OUTPUT_FILE + "&" + "PARAMETERS=" + variables.PARAMETERS;
            const requestOptions = {
                method: 'POST',
                data: variables
            };
            //console.log(JSON.stringify(variables))
            window.open(
            configData.RPT_URL + '?' + qrString,
            '_blank' // <- This is what makes it open in a new window.
            );
        }
        //useCallback(userId);
    }

    const calculatePremium = (updatedRows) => {
        //console.log(document.getElementById("familyFloater").value +"Sum Assured: " + familyFloater + ", Fin Year: " + financialYear);
        const premium=0;
        //console.log(employmentCategory);
        const tempMemCategory = (employmentCategory) => {
          if (employmentCategory === "Regular" || employmentCategory === "Grade Based Contract") {
            return 9;
          } else if (employmentCategory === "Consolidated") {
            return 8;
          }
    };
      
    const memCategory = tempMemCategory(employmentCategory);
        //console.log("setMasterMemCategory"+memCategory)
        setMasterMemCategory(memCategory);
        //console.log("memCategory: " + memCategory);
        //console.log("policyConfigList: " + JSON.stringify(policyConfigList));
        const selectedPolicy = policyConfigList.find((item) => {
          return (
            item.sumInsured === Number(document.getElementById("familyFloater").value) &&
            item.master.finYear === financialYear &&
            item.master.memberCategory.id === memCategory
          );
        });
        //console.log("selectedPolicy: " + JSON.stringify(selectedPolicy));
        if (selectedPolicy) {
          const {
            premiumToPay: premiumForMember,
            premiumToPayDep: premiumForSpouseChildren,
            premiumToPayDepParent: premiumForParents,
            premiumToPayNonDepParent:  premiumToPayNonDep,
            premiumToPayNonDepParent1:  premiumToPayAddon1
          } = selectedPolicy;
      
        // Perform further calculations or actions based on the premium values
        
        /*console.log("Premium for Member:", premiumForMember);
          console.log("Premium for Spouse/Children:", premiumForSpouseChildren);
          console.log("Premium for Parents:", premiumForParents);
          console.log("Premium for Non-Dependent Parents: 1", premiumToPayNonDep);
          console.log("Premium for Non-Dependent Parents: 2", premiumToPayAddon1);
          console.log("Premium for Non-Dependent Parents In-Laws: 1", premiumToPayNonDep);
          console.log("Premium for Non-Dependent Parents In-Laws: 2", premiumToPayAddon1);*/
        // Calculate the total premium
        let premium = premiumForMember; // + premiumForSpouseChildren + premiumForParents;
        let premiumForSpouseChildrenOnly = 0;
        let premiumForParentsOnly = 0;
        let premiumForNonDepParentsOnly = 0;
        let premiumForNonDepParentInLawsOnly = 0;
        let totalPremiumForAll=0;
        // Filter updatedRows based on conditions
        const filteredRows = updatedRows.filter((row) => {
        if (
            row.dependentCategory === "Yes" &&
            ["Husband", "Wife", "Son", "Daughter"].includes(row.relation)
        ) {
            //console.log("1")
            premiumForSpouseChildrenOnly += premiumForSpouseChildren;
            return false;
        } else if (
            row.dependentCategory === "Yes" &&
            ["Father", "Mother", "Step - Father", "Step - Mother", "Mother In Law", "Father In Law"].includes(
            row.relation
            )
        ) {
           // console.log("2")
            premiumForParentsOnly += premiumForParents;
            return false;
        } else if (
            row.dependentCategory === "No" &&
            ["Father", "Mother", "Step - Father", "Step - Mother"].includes(
            row.relation
            )
        ){
           // console.log("3")
            premiumForNonDepParentsOnly += premiumForNonDepParentsOnly;
            return false;
        }else if (
            row.dependentCategory === "No" &&
            [ "Mother In Law", "Father In Law"].includes(
            row.relation
            )
        ){
            //console.log("4")
            premiumForNonDepParentInLawsOnly += premiumForNonDepParentInLawsOnly;
            return false;
        }
        return true;
        });

        // Sum up premiums
        premium += premiumForSpouseChildrenOnly + premiumForParentsOnly;

        totalPremiumForAll+=premium+premiumForNonDepParentsOnly+premiumForNonDepParentInLawsOnly

        setTotalPremium(premium);
        setTotalPremiumToPay(premium+nonDepParentsPremium+nonDepParentsInlawsPremium);
        //console.log("Total Premium:", premium);
        //console.log("Total Premium for All:", totalPremiumForAll);
        } else {
          console.log("Selected policy not found.");
        }
    };
    
    // Calculate Premium for No Dependent Parents
    const calculatePremiumForNonDepParents = (updatedRows) => {
        const tempMemCategory = (employmentCategory) => {
          if (employmentCategory === "Regular" || employmentCategory === "Grade Based Contract") {
            return 9;
          } else if (employmentCategory === "Consolidated") {
            return 8;
          }
        };
      
        const memCategory = tempMemCategory(employmentCategory);
        setMasterMemCategory(memCategory);
        const selectedPolicy = policyConfigList.find((item) => {
          return (
            item.sumInsured === Number(document.getElementById("familyFloaterforNonDepParents").value) &&
            item.master.finYear === financialYear &&
            item.master.memberCategory.id === memCategory
          );
        });
        //console.log("selectedPolicy: " + JSON.stringify(selectedPolicy));
        if (selectedPolicy) {
          const { premiumToPayNonDep, premiumToPayAddon1 } = selectedPolicy;
          let premiumForNonDepParentsOnly = 0;
          let isFirstRow = true;
      
          const filteredRows = updatedRows.filter((row) => {
            if (
              row.dependentCategory === "No" &&
              ["Father", "Mother", "Step - Father", "Step - Mother"].includes(row.relation)
            ) {
              if (isFirstRow) {
                premiumForNonDepParentsOnly += premiumToPayNonDep;
                isFirstRow = false;
              } else {
                premiumForNonDepParentsOnly += premiumToPayAddon1;
              }
              return false;
            }
            return true;
          });
      
        setNonDepParentsPremium(premiumForNonDepParentsOnly);
        setTotalPremiumToPay(totalPremium+premiumForNonDepParentsOnly+nonDepParentsInlawsPremium);

        } else {
          console.log("Selected policy not found.");
        }
    };
      
    // Calculate Premium for No Dependent Parent in laws
    const calculatePremiumForNonDepParentsInLaws = (updatedRows) => {
        const tempMemCategory = (employmentCategory) => {
          if (employmentCategory === "Regular" || employmentCategory === "Grade Based Contract") {
            return 9;
          } else if (employmentCategory === "Consolidated") {
            return 8;
          }
    };
      
    const memCategory = tempMemCategory(employmentCategory);
        setMasterMemCategory(memCategory);
        const selectedPolicy = policyConfigList.find((item) => {
          return (
            item.sumInsured === Number(document.getElementById("familyFloaterforNonDepParentsInlaws").value) &&
            item.master.finYear === financialYear &&
            item.master.memberCategory.id === memCategory
          );
        });
      
        //console.log("selectedPolicy: " + JSON.stringify(selectedPolicy));
        if (selectedPolicy) {
          const { premiumToPayNonDep, premiumToPayAddon1 } = selectedPolicy;
      
          let premiumForNonDepParentInLawsOnly = 0;
          let isFirstRow = true;
      
          const filteredRows = updatedRows.filter((row) => {
            if (
              row.dependentCategory === "No" &&
              ["Father In Law", "Mother In Law", "Father in law", "Mother in law"].includes(row.relation)
            ) {
              if (isFirstRow) {
                premiumForNonDepParentInLawsOnly += premiumToPayNonDep;
                isFirstRow = false;
              } else {
                premiumForNonDepParentInLawsOnly += premiumToPayAddon1;
              }
              return false;
            }
            return true;
          });
        //console.log
        setNonDepParentsInlawsPremium(premiumForNonDepParentInLawsOnly);
        setTotalPremiumToPay(totalPremium+nonDepParentsPremium+premiumForNonDepParentInLawsOnly);

        } else {
          console.log("Selected policy not found.");
        }
    };


    // Handle checkbox toggle
    const handleCheckboxToggle = (index) => {
        if (
          document.getElementById("familyFloater").value === "Select" ||
          document.getElementById("familyFloater").value === ""
        ) {
          // Field is not selected, handle the error or validation logic
          alert("Select Family Floater Opted for Member & Dependents");
          return;
        }
      
        const updatedRows = [...dependentRows];
        updatedRows[index].isChecked = !updatedRows[index].isChecked;
        setDependentRows(updatedRows);
      
        const selectedPolicies = updatedRows
          .filter((row) => row.isChecked || selectAll)
          .map((row) => {
            if (!row.isChecked) return null; // Skip unchecked rows
            const selectedRelation = relationList.find(
              (relation) => relation.detailCode === row.relation
            );
            let memberDepdCategory;
      
            if (row.dependentCategory === "Yes") {
              if (["Son", "Wife", "Daughter", "Husband"].includes(row.relation)) {
                memberDepdCategory = 30;
              } else if (["Mother", "Father", "Father In Law", "Mother In Law"].includes(row.relation)) {
                memberDepdCategory = 31;
              }
            } else {
              if (["Mother", "Father", "Father In Law", "Mother In Law"].includes(row.relation)) {
                memberDepdCategory = 32;
              } else {
                memberDepdCategory = 33;
              }
            }
      
            return {
              name: row.name,
              dob: row.dob,
              relation: { id: selectedRelation.id },
              memberCategory: { id: memberDepdCategory },
              sumInsured: familyFloater,
              premiumAmount: memberDepdCategory === 31 ? premiumForDepParent : premiumForDepMember,
              remarks: "",
            };
          })
          .filter((policy) => policy !== null); // Remove null values
      
        setSelectedDependentsPolicies(selectedPolicies);
        calculatePremium(updatedRows.filter((row) => row.isChecked));
      };

        const getPremiumForSelectedFloater = (policyConfigData, employmentCategory, selectedFloater, columnName) => {
        const memCategoryId = employmentCategory === "Regular" || employmentCategory === "Grade Based Contract" ? 9 : 8;

        const filteredData = policyConfigData.filter(item => {
        //console.log(item.master.memberCategory.id)
            if (
                Number(item.master.memberCategory.id) === Number(memCategoryId) &&
                Number(item.sumInsured) === Number(selectedFloater)
                ) 
            {        
                return true;
            }    
                return false;
        });

        const floater = filteredData[0];

        if (floater && floater[columnName]) {
            //console.log("floater[columnName]"+floater[columnName])
            return floater[columnName];
        }
        return null;
    };
  
    const handleCheckboxToggleNonDepParent = (index) => {
        if (document.getElementById("familyFloaterforNonDepParents").value === 'Select' || document.getElementById("familyFloaterforNonDepParents").value === '') {
          // Field is not selected, handle the error or validation logic
          alert('Select Floater Opted for Non Dependent Parents');
          return;
        }
        const updatedRows = [...nonDependentParentRows];
        updatedRows[index].isChecked = !updatedRows[index].isChecked;
        setNonDependentParentRows(updatedRows);
        
        const selectedPolicies = updatedRows
          .filter((row) => row.isChecked || selectAll)
          .map((row, mapIndex) => {
            const selectedRelation = relationList.find((relation) => relation.detailCode === row.relation);
      
            let memberDepdCategory;
      
            if (row.dependentCategory === "No") {
              if (["Mother", "Father", "Father In Law", "Mother In Law"].includes(row.relation)) {
                memberDepdCategory = 32;
              } else {
                memberDepdCategory = 0;
              }
            }
      
            const premiumAmount = mapIndex === 0 ? premiumForNonDepFirstParent : premiumForNonDepSecondParent;
      
            return {
              name: row.name,
              dob: row.dob,
              relation: { id: selectedRelation.id },
              memberCategory: { id: memberDepdCategory },
              sumInsured: nonDepParentsSumInsured,
              premiumAmount: premiumAmount,
              remarks: "",
            };
          });
      
        setSelectedNonDepParentsPolicies(selectedPolicies);
        calculatePremiumForNonDepParents(updatedRows.filter((row) => row.isChecked));
      };
      


      const handleCheckboxToggleNonDepParentInLaws = (index) => {
        if (document.getElementById("familyFloaterforNonDepParentsInlaws").value === 'Select' || document.getElementById("familyFloaterforNonDepParentsInlaws").value === '') {
          // Field is not selected, handle the error or validation logic
          alert('Select Floater Opted for Non Dependent Parent in laws');
          return;
        }
        const updatedRows = [...nonDependentParentInLawsRows];
        updatedRows[index].isChecked = !updatedRows[index].isChecked;
        setNonDependentParentInLawsRows(updatedRows);
      
        const selectedPolicies = updatedRows
          .filter((row) => row.isChecked || selectAll)
          .map((row, mapIndex) => {
            const selectedRelation = relationList.find((relation) => relation.detailCode === row.relation);
      
            let memberDepdCategory;
      
            if (row.dependentCategory === "No") {
              if (["Father In Law", "Mother In Law", "Father in law", "Mother in law"].includes(row.relation)) {
                memberDepdCategory = 32;
              } else {
                memberDepdCategory = 0;
              }
            }
      
            const premiumAmount = mapIndex === 0 ? premiumForNonDepInLawsFirstParent : premiumForNonDepInLawsSecondParent;
      
            return {
              name: row.name,
              dob: row.dob,
              relation: { id: selectedRelation.id },
              memberCategory: { id: memberDepdCategory },
              sumInsured: nonDepParentInlawsSumInsured,
              premiumAmount: premiumAmount,
              remarks: "",
            };
          });
      
        setSelectedNonDepParentInLawsPolicies(selectedPolicies);
        calculatePremiumForNonDepParentsInLaws(updatedRows.filter((row) => row.isChecked));
      };
      
  
  return (
    <div>     
      <form >
        <div id="finYear" className="row-hrow">
            <div  className="form-col">
                <div className="row-hrow">
                    <div >
                        <label>Financial Year:</label>
                    </div>
                    <div >
                        <select value={financialYear} onChange={handleFinancialYearChange}>
                        {financialYearOptions.map((option) => (
                            <option key={option} value={option}>
                            {option}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
            </div>
            <div  className="form-col"></div>
            <div id="aboutNonDepAddition" className="col-4">
                <span style={{ color: 'red', float: 'right' }}>Those who want to add Non-dependent parents can add through iPromis (My Menu--Add Non-Dependent)</span>
            </div>

            {/*<div className="col-4">
                <label htmlFor="policy-name">Policy Name:  </label>
                <label for="policy-name-value">{policyConfigList.master[0].policyName} </label>
            </div>*/}
            
        </div>
        <div className="form-section">
            <h3>Employee Information</h3>
            <div className="form-row">
                <div className="form-col">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    disabled={true}
                    className="bgdisabledColor"
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="form-col">
                <label>Employee Code:</label>
                <input
                    type="text"
                    value={employeeCode}
                    disabled={true}
                    className="bgdisabledColor"
                    onChange={(e) => setEmployeeCode(e.target.value)}
                />
                </div>
                <div className="form-col">
                <label htmlFor="dept">Department / Section:</label>
                <input
                    name="dept"
                    type="text"
                    required={true}
                    id="dept"
                    className="bgdisabledColor"
                    value={deptSection}
                    disabled={true}
                />
                </div>
            </div>
    
            <div className="form-row">
                <div className="form-col">
                <label>Ext No:</label>
                <input
                    type="text"
                    value={extNo}
                    onChange={(e) => setExtNo(e.target.value)}                
                />
                </div>
                <div className="form-col">
                <label>Designation:</label>
                <input
                    type="text"
                    data-tip
                    data-for="designationTip"
                    className="bgdisabledColor"
                    id="designation"
                    maxLength="100"
                    required={true}
                    value={designation}
                    disabled={true}
                />
                </div>
                <div className="form-col">
                <label>Mobile:</label>
                <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={true}
                    className="bgdisabledColor"
                />
                </div>
            </div>
    
            <div className="form-row">
                <div className="form-col">
                <label>Date of Birth:</label>
                <DatePicker
                    name="dob"
                    type="date"
                    id="dob"
                    className="input-field bgdisabledColor"
                    dateFormat="dd-MM-yyyy"
                    maxDate={new Date()}
                    value={dob}
                    disabled={true}
                />
                </div>
                <div className="form-col">
                <label>Net Salary (last Month):</label>
                <input
                    type="text"
                    value={netSalary}
                    onChange={(e) => setNetSalary(e.target.value)}
                    disabled={true}
                    className="bgdisabledColor"
                />
                </div>
                <div className="form-col">
                <label>Whether member of existing Mediclaim Scheme of the Centre</label>
                <select
                    className="form-control"
                    id="existingMedClaim"
                    name="existingMedClaim"
                    value={existingMedClaim}
                    onChange={(e) => setExistingMedClaim(e.target.value)}
                    required 
                >
                    <option value="Select" >Select</option>
                    {existingMedClaims.map((e) => (
                    <option key={e.value} value={e.value} title={e.value}>
                        {e.value}
                    </option>
                    ))}
                </select>
                </div>
            </div>
        </div>        
    
        <div className="form-row"></div>
        
        <div className="form-section">
            <h3>Sum Insured and Premium for different Floaters </h3>
                <div className="table-container">
                    <InsuranceTable
                    policyConfigData={policyConfigList}
                    employmentCategory={employmentCategory}
                    />
                </div>
            </div>
        
        <div className="form-row"></div>
        
        {dependentRows.length > 0 && (
            <div className="form-section">
                <h3>Member & Dependents Details</h3>
            <div className="form-row"></div>

            <div className="form-row">
                <div className="form-col-4">
                <label>Floater Opted for Member and Dependents:</label>
                <select
                    className="form-control"
                    id="familyFloater"
                    name="familyFloater"
                    value={familyFloater}
                    onChange={(e) => handleFamilyFloaterChange(e.target.value)}
                    required
                >
                    <option value="Select" >Select</option>
                    {familyFloaterList.map((data) => (
                    <option key={data.sumInsured} value={data.sumInsured}>
                        {data.sumInsured}
                    </option>
                    ))}
                </select>
                </div>

                <div className="form-col-4">
                <label htmlFor="dept">Premium for Member:</label>
                <input
                    name="premiumForMember"
                    type="premiumForMember"
                    id="premiumForMember"
                    className="bgdisabledColor"
                    value={premiumForMember}
                    disabled={true}
                />
                </div>

                <div className="form-col-4">
                <label htmlFor="dept">Premium for Spouse & Children:</label>
                <input
                    name="premiumForDepMember"
                    type="premiumForDepMember"
                    id="premiumForDepMember"
                    className="bgdisabledColor"
                    value={premiumForDepMember}
                    disabled={true}
                />
                </div>

                <div className="form-col-4">
                <label htmlFor="dept">Premium for Parents:</label>
                <input
                    name="premiumForDepParent"
                    type="premiumForDepParent"
                    id="premiumForDepParent"
                    className="bgdisabledColor"
                    value={premiumForDepParent}
                    disabled={true}
                />
            </div>        
        </div>

        <div className="form-row"></div>
            <div className="table-container">
                <table className="dependent-table">
                <thead>
                    <tr>
                    <th>Sl No.</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Relation</th>
                    <th>Is Dependent?</th>
                    {/*<th>Premium for Selected Sum</th>*/}
                    <th>
                        {/*<input
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                    />*/}
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {dependentRows.map((row, index) => (
                    <tr key={index}>
                        <td className='table-th-slno'>{row.slNo}</td>
                        <td>{row.name}</td>
                        <td>{row.dob}</td>
                        <td>{row.relation}</td>
                        <td>{row.dependentCategory}</td>
                        {/*<td>{row.remarks}</td>*/}
                        <td>
                        <input
                            type="checkbox"
                            checked={row.isChecked || selectAll}
                            onChange={() => handleCheckboxToggle(index)}
                        />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        )}
        {nonDependentParentRows.length > 0 && (
        <div className="form-section">
            <h3>Non Dependents Parents</h3>
            <div className="form-row"></div>

            <div className="form-row">
                <div className="form-col">
                <label>Floater Opted for Non Dependent Parents:</label>
                <select
                    className="form-control"
                    id="familyFloaterforNonDepParents"
                    name="familyFloaterforNonDepParents"
                    value={familyFloaterforNonDepParents}
                    onChange={(e) => handleFamilyFloaterForNonDepParentsChange(e.target.value)}
                    required
                >
                    <option value="Select" >Select</option>
                    {familyFloaterList.map((data) => (
                    <option key={data.sumInsured} value={data.sumInsured}>
                        {data.sumInsured}
                    </option>
                    ))}
                </select>
                </div>

                <div className="form-col">
                <label htmlFor="dept">Premium for Non Dependent first Person :</label>
                <input
                    name="premiumForNonDepFirstParent"
                    type="premiumForNonDepFirstParent"
                    id="premiumForNonDepFirstParent"
                    className="bgdisabledColor"
                    value={premiumForNonDepFirstParent}
                    disabled={true}
                />
                </div>

                <div className="form-col">
                <label htmlFor="dept">Premium for Non Dependent Second Person :</label>
                <input
                    name="premiumForNonDepSecondParent"
                    type="premiumForNonDepSecondParent"
                    id="premiumForNonDepSecondParent"
                    className="bgdisabledColor"
                    value={premiumForNonDepSecondParent}
                    disabled={true}
                />
                </div>
            </div>
            <div className="form-row"></div>
            <div className="table-container">
                <table className="dependent-table">
                    {/* Table header */}
                    <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Relation</th>
                        <th>Is Dependent?</th>
                        {/*<th>Premium for Selected Sum</th>*/}
                        <th></th>
                    </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                    {nonDependentParentRows.map((row, index) => (
                        <tr key={index}>
                        <td className='table-th-slno'>{index+1}</td>
                        <td>{row.name}</td>
                        <td>{row.dob}</td>
                        <td>{row.relation}</td>
                        <td>{row.dependentCategory}</td>
                        {/*<td>{row.remarks}</td>*/}
                        <td>
                            <input
                            type="checkbox"
                            checked={row.isChecked || selectAll}
                            onChange={() => handleCheckboxToggleNonDepParent(index)}
                            />
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        )}

        {nonDependentParentInLawsRows.length > 0 && (
        <div className="form-section">
            <h3>Non Dependents Parent In Laws Details</h3>
            <div className="form-row"></div>
            
            <div className="form-row">
                <div className="form-col">
                <label>Floater Opted for Non Dependent Parent in laws:</label>
                <select
                    className="form-control"
                    id="familyFloaterforNonDepParentsInlaws"
                    name="familyFloaterforNonDepParentsInlaws"
                    value={familyFloaterforNonDepParentsInlaws}
                    onChange={(e) => handleFamilyFloaterForNonDepParentsInLawsChange(e.target.value)}
                    required
                >
                    <option value="Select" >Select</option>
                    {familyFloaterList.map((data) => (
                    <option key={data.sumInsured} value={data.sumInsured}>
                        {data.sumInsured}
                    </option>
                    ))}
                </select>
                </div>

                <div className="form-col">
                <label htmlFor="dept">Premium for Non Dependent first Person :</label>
                <input
                    name="premiumForNonDepInLawsFirstParent"
                    type="premiumForNonDepInLawsFirstParent"
                    id="premiumForNonDepInLawsFirstParent"
                    className="bgdisabledColor"
                    value={premiumForNonDepInLawsFirstParent}
                    disabled={true}
                />
                </div>

                <div className="form-col">
                <label htmlFor="dept">Premium for Non Dependent Second Person :</label>
                <input
                    name="premiumForNonDepInLawsSecondParent"
                    type="premiumForNonDepInLawsSecondParent"
                    id="premiumForNonDepInLawsSecondParent"
                    className="bgdisabledColor"
                    value={premiumForNonDepInLawsSecondParent}
                    disabled={true}
                />
                </div>

            </div>

            <div className="form-row"></div>
            <div className="table-container">
                <table className="dependent-table">
                <thead>
                    <tr>
                    <th>Sl No.</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Relation</th>
                    <th>Is Dependent?</th>
                    {/*<th>Premium for Selected Sum</th>*/}
                    <th>
                        {/*<input
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                    />*/}
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {nonDependentParentInLawsRows.map((row, index) => (
                    <tr key={index}>
                        <td className='table-th-slno'>{index+1}</td>
                        <td>{row.name}</td>
                        <td>{row.dob}</td>
                        <td>{row.relation}</td>
                        <td>{row.dependentCategory}</td>
                        {/*<td>{row.remarks}</td>*/}
                        <td>
                        <input
                            type="checkbox"
                            checked={row.isChecked || selectAll}
                            onChange={() => handleCheckboxToggleNonDepParentInLaws(index)}
                        />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        )}

        <div className="form-section">
            <h3>Summary </h3>
            <div className="form-row">
                <div className="form-col-4">
                <label>Sum Insured for Member & Dependents:</label>
                <input
                    type="text"
                    className="form-control bgdisabledColor"
                    value={totalSumInsured}
                    disabled
                />
                </div>
                <div className="form-col-4">
                <label>Premium for Member & Dependents:</label>
                <input
                    type="text"
                    className="form-control bgdisabledColor"
                    value={totalPremium}
                    disabled
                />
                </div>
                <div className="form-col-8">
                {nonDependentParentRows.length > 0 && (
                    <div  className="form-row">
                        <div className="form-col-8">
                        <label>Sum Insured for Non Dependent Parents:</label>
                        <input
                            type="text"
                            className="form-control bgdisabledColor"
                            value={nonDepParentsSumInsured}
                            disabled
                        />
                        </div>
                        <div className="form-col-8">
                        <label>Premium for Non Dependent Parents:</label>
                        <input
                            type="text"
                            className="form-control bgdisabledColor"
                            value={nonDepParentsPremium}
                            disabled
                        />
                        </div>
                    </div>
                )}
                </div>
            </div>

            <div className="form-row">
                <div className="form-col-4">
                    <label>Total Premium to Pay:</label>
                    <input
                        type="text"
                        className="form-control bgdisabledColor"
                        value={totalPremiumToPay}
                        disabled
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-col-8">
                    {nonDependentParentInLawsRows.length > 0 && (
                    <div  className="form-row">
                        <div className="form-col-8">
                        <label>Sum Insured for Non Dependent Parent In Laws:</label>
                        <input
                            type="text"
                            className="form-control bgdisabledColor"
                            value={nonDepParentInlawsSumInsured}
                            disabled
                        />
                        </div>
                        <div className="form-col-8">
                        <label>Premium for Non Dependent Parent In Laws:</label>
                        <input
                            type="text"
                            className="form-control bgdisabledColor"
                            value={nonDepParentsInlawsPremium}
                            disabled
                        />
                        </div>
                    </div>
                    )}
                </div>
                {/*value={(isNaN(Number(totalPremium)) ? 0 : Number(totalPremium)) +
                                (isNaN(Number(nonDepParentsPremium)) ? 0 : Number(nonDepParentsPremium)) +
                            (isNaN(Number(nonDepParentsInlawsPremium)) ? 0 : Number(nonDepParentsInlawsPremium))}*/}
                
            </div>
            
            <div className="row-hrow">
                <input
                    type="checkbox"
                    id="deduct-from-reimbursement"
                    checked={deductFromReimbursement}
                    onChange={(e) => {
                    const checked = e.target.checked;
                    setDeductFromReimbursement(checked);
                    if (!checked) {
                        document.getElementById("deduct-from-reimbursement").value=0;
                    }
                    else
                    {
                        document.getElementById("deduct-from-reimbursement").value=totalPremium;
                    }
                        setDeductFromReimbursementAmount(e.target.value);
                    }}
                />
                <label htmlFor="deduct-from-reimbursement">Deduct from Reimbursement: </label>
                {deductFromReimbursement && (
                    <div>
                    <label htmlFor="reimbursement-amount">Reimbursement Amount:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deductFromReimbursementAmount}
                        onChange={(e) => {
                        const value = e.target.value;
                        if (value <= totalPremium) {
                            setDeductFromReimbursementAmount(value);
                        }
                        }}
                    />
                    </div>
                )}
                <input
                    type="checkbox"
                    id="deduct-from-salary"
                    checked={deductFromSalary}
                    onChange={(e) => {
                    const checked = e.target.checked;
                    setDeductFromSalary(checked);
                    if (!checked) {
                        setDeductFromSalaryAmount(0);
                    }           
                    }}
                />
                <label htmlFor="deduct-from-salary">Deduct from Salary: </label>
                {deductFromSalary && (
                    <div>
                    <label htmlFor="salary-amount">Deduct from Salary Amount:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={deductFromSalaryAmount}
                        onChange={(e) => {
                        const value = e.target.value;
                    // if (value <= totalPremium) {
                            setDeductFromSalaryAmount(value);
                        //}
                        }}
                    />
                    </div>
                )}
                <input
                    type="checkbox"
                    id="deduct-through-cheque"
                    checked={deductThroughCheque}
                    onChange={(e) => {
                    const checked = e.target.checked;
                    setDeductThroughCheque(checked);
                    if (!checked) {
                        setChequeAmount(0);
                    }
                    }}
                />
                <label htmlFor="deduct-through-cheque">Deduct through Cheque: </label>
                {deductThroughCheque && (
                    <div>
                    <label htmlFor="cheque-amount">Cheque Amount:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={chequeAmount}
                        onChange={(e) => {
                        const value = e.target.value;
                        //if (value <= totalPremium) {
                            setChequeAmount(value);
                        //}
                        }}
                    />
                    </div>
                )}
            </div>

            {deductThroughCheque && (
            <div className="form-row">            
                <div className="form-col">
                    <label>Cheque No:</label>
                    <input
                    type="text"
                    className="form-control"
                    value={chequeNo}
                    onChange={(e) => setChequeNo(e.target.value)}
                    />
                </div>
                <div className="form-col">
                    <label>Cheque Date:</label>
                        <DatePicker
                            className="form-control"
                            value={chequeDate}
                            onChange={(date) =>
                            setChequeDate(dateFormat(date, "dd-mm-yyyy"))
                            }
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                        />


                </div>
                <div className="form-col">
                    <label>Bank:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                    />
                </div>
            </div>
            )}        
    
            <div className="form-row">            
                <div className="form-col-4">
                    <label>Witness Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={witnessName}
                        onChange={(e) => setWitnessName(e.target.value)}
                    />
                </div>
                <div className="form-col-4">
                    <label> Date:</label>
                    <div className="date-picker">
                        <DatePicker
                        className="form-control"
                        type='date'
                        id="signedDate"
                        name="signedDate"
                        value={signedDate}
                        onChange={(date) => setSignedDate(dateFormat(date, "dd-mm-yyyy"))}
                        dateFormat="dd-MM-yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        />                    
                    </div>
                </div>
            </div>
        </div>
        
        <div className="form-row">
            <div className="form-col">
                <div className="form-submit">
                <button type="submit"  onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="form-col">
                <div >
                <button name="printBtn" id="printBtn" type='submit' onClick={printMedClaimInsurance}> Print</button>
                </div>
            </div>
        </div>

      </form>
    </div>
  );
};

export default MedClaimInsurance;