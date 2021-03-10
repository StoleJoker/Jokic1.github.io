var proizvodi;

window.onload = function(){

////////// Dohvatanje podataka iz fajla products.json
    $.ajax({
        url: "data/products.json",
        method: "get",
        dataType: "json",
        success: function(result){
            proizvodi = result;
            console.log(proizvodi);
            ispisProizvoda(result);
            console.log(result);
        },
        error: function(xhr){
            console.log(xhr);
        }
    });

////////// Dohvatanje podataka iz fajla brands.json
    $.ajax({
        url: "data/brands.json",
        method: "get",
        dataType: "json",
        success: function(result){
            ispisBrendova(result);
            console.log(result);
        },
        error: function(xhr){
            console.log(xhr);
        }
    });

////////// Dohvatanje podataka iz fajla category.json
    $.ajax({
        url: "data/category.json",
        method: "get",
        dataType: "json",
        success: function(result){
            ispisKategorija(result);
            console.log(result);
        },
        error: function(xhr){
            console.log(xhr);
        }
    });
}

///////// Funkcija za ispisivanje proizvoda

function ispisProizvoda(data){
    let ispis = "";
    for(let element of data){
        ispis +=`<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="sport_product">
                        <figure><img src="${element.img.src}" alt="${element.img.alt}" class="img-fluid"/></figure>
                            <s> $${element.price.old}</s>
                            <h3> $<strong class="price_text">${element.price.new}</strong></h3>
                            <p> ${printStars(element.stars)}</p>
                            <h4>${element.name}</h4>
                            <p class="description"> ${element.description}</p>
                            <input type="button" name="button" id="dugme" value="Add to cart"/> 
                    </div>
                 </div>`
    }
    $("#prikazProizvoda").html(ispis);
} 

////////// Funkcija za ispisivanje brendova
    function ispisBrendova(data){
        ispis = "<option value='0'> Choose </option>";
        for(let element of data){
            ispis +=`<option value="${element.id}">${element.nameBrand}</option>`
        }
     $("#ddlBrand").html(ispis);   
    }


////////// Funkcija za ispisivanje kategorija
    function ispisKategorija(data){
        ispis = "<option value='0'> Choose </option>";
        for(let element of data){
            ispis +=`<option value="${element.id}">${element.nameCat}</option>`
        }
        $("#ddlCat").html(ispis);   
    }

////////// Funkcija za ispisivanje zvezdica
    function printStars(numberOfStars){
        let html = "";
        for(let i = 1; i <= 5; i++){
            if(i <= numberOfStars){
                html += `<i class="fas fa-star"></i>`
            }
            else{
                html += `<i class="far fa-star"></i>`
            }
        }
        return html;
    }
////////// Funkcija za filtriranje po brendovima
    $("#ddlBrand").change(function(){
        var izabraniId = $("#ddlBrand").val();
        console.log(izabraniId);
        var filterProizvodi = proizvodi.filter(el => el.idBrand==izabraniId);
        console.log(filterProizvodi);
        if(izabraniId==0){
            ispisProizvoda(proizvodi);
        }
        else {
            ispisProizvoda(filterProizvodi);
        }
    })
////////// Funkcija za filtriranje po kategoriji
$("#ddlCat").change(function(){
    var izabraniId = $("#ddlCat").val();
    console.log(izabraniId);
    var filterProizvodi = proizvodi.filter(el => el.idCat==izabraniId);
    console.log(filterProizvodi);
    if(izabraniId==0){
        ispisProizvoda(proizvodi);
    }
    else {
        ispisProizvoda(filterProizvodi);
    }
})
////////// Funkcija za sortiranje cene
$("#ddlSort").change(function(){
    var sortPrice = $("#ddlSort").val();
    console.log(sortPrice);
    var sortiranaCena;
    if(sortPrice=="priceAsc"){
        sortiranaCena = proizvodi.sort(function(a, b){
            if(a.price.new > b.price.new){
                return 1;
            }
            if(a.price.new < b.price.new){
                return -1;
            }
            if(a.price.new == b.price.new){
                return 0;
            }
        })
    }
    else if(sortPrice=="priceDesc"){
        sortiranaCena = proizvodi.sort(function(a, b){
            if(a.price.new > b.price.new){
                return -1;
            }
            if(a.price.new < b.price.new){
                return 1;
            }
            if(a.price.new == b.price.new){
                return 0;
            }
        })
    }
    ispisProizvoda(sortiranaCena);
})
////////// Dodavanje i brisanje iz korpe

