var main = $("#main_area");
var actdict = {};

function initindex() {
    if (main.find("h1,h2,h3,h4,h5,h6,p,pre,ol,ul").first().prop("tagName") != "H1") {
        main.prepend($("<h1></h1>").text($("title").text()));
    }
    main.find("h1,h2,h3,h4,h5,h6,p,pre,ol,ul").addClass("a_content");
    main.find("h1,h2,h3").addClass("a_header");
    let header = "";
    $(".a_content").each(function() {
        if ($(this).hasClass("a_header")) {
            header = $(this).text();
            $(this).attr("id", header);
        } else {
            $(this).attr("connectedheader", header);
        }
    });
    let index = $("#indexbar");
    let createul = () => $('<ul class="nav"></ul>');
    let createcollapse = () => $('<div class="collapse collapse_for_header"></div>');
    let createli = (name) => $('<li><a href="#' + name + '" title="' + name + '" class="text-truncate" smoothhashscroll>' + name + '</a></li>');
    let p0 = createul();
    index.append(p0);
    let p1 = p0;
    let p2 = p0;
    let l1 = null;
    let l2 = null;
    $(".a_header").each(function() {
        let name = $(this).text();
        let l = createli(name);
        let pp2 = createcollapse();
        switch ($(this).prop("tagName")) {
            case "H1":
                p0.append(l);
                p1 = createul();
                p2 = createul();
                pp2.append(p2);
                p1.append(pp2);
                l2 = l1 = l;
                l.append(p1);
                actdict[name] = [l];
                break;
            case "H2":
                p1.append(l);
                p2 = createul();
                pp2.append(p2);
                l.append(pp2);
                l2 = l;
                actdict[name] = [l, l1];
                break;
            case "H3":
                p2.append(l);
                actdict[name] = [l, l1, l2];
                break;
        }
    });
}

function update_inview() {
    $(".a_content").each(function() {
        let rect = this.getBoundingClientRect();
        let inView = rect.top >= 0 && rect.left >= 0 && rect.bottom <= $(window).height() && rect.right <= $(window).width();
        if (inView&&this.parentNode.tagName=="DETAILS"){
            inView = inView&&this.parentNode.open;
        }
        if (inView != $(this).hasClass("a_content_inview")) {
            if (inView) $(this).addClass("a_content_inview");
            else $(this).removeClass("a_content_inview");
        }

    });
    $(".a_header_targeted").removeClass("a_header_targeted");
    let o = $(".a_content_inview:first");
    let target = o.attr("connectedheader");
    if (o.hasClass("a_header")) target = o.attr("id");
    if (target) document.getElementById(target).classList.add("a_header_targeted");
    $(".activated").removeClass("activated");
    $(".a_header_targeted").each(function() {
        for (let o of actdict[$(this).text()]) {
            o.addClass("activated");
        }
    });
    $(".collapse_for_header").each(function() {
        let showing = $(this).parent().hasClass("activated");
        if (showing != $(this).hasClass("show")) {
            if (showing) $(this).addClass("show");
            else $(this).removeClass("show");
        }
    });
}
//table style
main.find("table").addClass("table").addClass("table-striped").addClass("table-bordered");
//remove empty
main.find("h1,h2,h3,h4,h5,h6,p,pre,ol,ul").each(function(){
    if ($(this).text()=="")$(this).remove();
});
//init index
if (!(location.href.endsWith("/") || location.href.endsWith("/index"))) {
    initindex();
}
//init view detect
$(window).on('DOMContentLoaded load resize scroll', update_inview);
//previous btn action
$("#previous").click(() => {
    if (location.href.endsWith("/")) {
        location.href = "../";
    } else {
        location.href = "./";
    }
});
//code copy
var copyer = document.createElement("input");
document.body.appendChild(copyer);
$(copyer).hide();
$("code").each(function() {
    let p = $(this).parent();
    let copy = $("<button style='background-color: rgba(255,255,255,0.2);position:absolute;right:0px;top:0px;font-size:10px;padding:0px;margin:0px;border:0px;></button>");
    p.append(copy);
    p.css("position","relative");
    let text = $(this).text();
    copy.click(function() {
        copyer.value = text;
        copyer.select();
        copyer.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyer.value);
    });
});