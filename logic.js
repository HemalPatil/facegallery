var faceWidth = 50;
var faceHeight = 50;

function initializeImages()
{
	for(i=0; i<faces.length; i++)
	{
		faces[i].style.backgroundPosition = "0px " + -(faces[i].dataset.row*faceHeight) + "px";
	}
}

function calculateAngle(x1, y1, x2, y2)
{
	// Here care has to be taken, because our origin lies at bottom left and grows towards right and top but computer's origin lies at top left and grows towards right and bottom
	var diffX = Math.abs(x1 - x2);
	var diffY = Math.abs(y1 - y2);
	var atan = Math.atan(diffY / diffX) * 180 / Math.PI;
	if(x1>x2 && y1>y2)
	{
		return 180 - atan;
	}
	if(x1<x2 && y1<y2)
	{
		return 360 -atan;
	}
	if(x1>x2 && y1<y2)
	{
		return 180 + atan;
	}
	if(x1<x2 && y1>y2)
	{
		return atan;
	}
}

function getLeft(x)
{
	var left = 0;
	for(;x != null;)
	{
		left += x.offsetLeft;
		x = x.offsetParent;
	}
	return left;
}

function getTop(x)
{
	var top = 0;
	for(;x != null;)
	{
		top += x.offsetTop;
		x = x.offsetParent;
	}
	return top;
}

function handleMouseMove(event)
{
	// for each face
	for(i=0; i<faces.length; i++)
	{
		// get the midpoint of the face
		var faceMidX = getLeft(faces[i]) + faces[i].clientWidth/2;
		var faceMidY = getTop(faces[i]) + faces[i].clientHeight/2;

		// find the angle between the line connection the mouse pointer and the midpoint of face w.r.t to the X-axis
		var angle = calculateAngle(faceMidX, faceMidY, event.pageX, event.pageY);

		// offset of the background position
		var imageOffset = 0;

		// set the image offset according to the angle
		if((angle>=0 && angle<22.5) || (angle>=337.5 && angle<=360))
		{
			imageOffset = -300;
		}
		else if(angle>=22.5 && angle<67.5)
		{
			imageOffset = -350;
		}
		else if(angle>=67.5 && angle<112.5)
		{
			imageOffset = 0;
		}
		else if(angle>=112.5 && angle<157.5)
		{
			imageOffset = -50;
		}
		else if(angle>=157.5 && angle<202.5)
		{
			imageOffset = -100;
		}
		else if(angle>=202.5 && angle<247.5)
		{
			imageOffset = -150;
		}
		else if(angle>=247.5 && angle<292.5)
		{
			imageOffset = -200;
		}
		else if(angle>=292.5 && angle<337.5)
		{
			imageOffset = -250;
		}
		else
		{
			// in case of undefined values or other edge cases
			imageOffset = 0;
		}
		if(faces[i].dataset.row == 0 && faces[i].dataset.column == 0)
		{
			// just a debug feature for the face at 0,0
			document.getElementById('lolz00').value = angle;
			document.getElementById('x00').value = faceMidX;
			document.getElementById('y00').value = faceMidY;
			document.getElementById('mx00').value = event.pageX;
			document.getElementById('my00').value = event.pageY;
		}
		// set the actual offset of the background
		faces[i].style.backgroundPosition = imageOffset + "px " + -(faces[i].dataset.row*faceHeight) + "px";
	}
}
function createFaces(){
	var x = userInput,rows,remEle,currentRow=0;
	if(x>=1 && x<=25){
		rows=x/5;
		remEle=x%5;
		var table = document.createElement("TABLE");
		document.getElementById("profile-wrapper").appendChild(table);
		var tbody = document.createElement("TBODY");
		table.appendChild(tbody);
		for(i=0;i<=rows-1;i++){
			var div1 = document.createElement("DIV");
			tbody.appendChild(div1);
			var tr = document.createElement("TR");
			div1.appendChild(tr);
			div1.className = "urow";
			for(j=0;j<5;j++){
				var td = document.createElement("TD");
				tr.appendChild(td);
				td.className = "rotating-face"
				td.setAttribute("data-row", i);
				td.setAttribute("data-column", j);
			}
			currentRow++;
		}
		var div2 = document.createElement("DIV");
		tbody.appendChild(div2);
		var tr = document.createElement("TR");
		div2.appendChild(tr);
		div2.className = "lrow";
		for(j=0;j<remEle;j++){
			var td = document.createElement("TD");
			tr.appendChild(td);
			td.className = "rotating-face";
			td.setAttribute("data-row", currentRow);
			td.setAttribute("data-column", j);
		}
	}
	else{
		confirm("The number is not in the mentioned range");
	}
}

function doFirst()
{
	userInput = prompt("Enter a number");
	createFaces();
	// call this function everytime the mouse moves over the document
	document.onmousemove = handleMouseMove;
	var body = document.body;	// get the body element
	var ut = document.getElementsByClassName('urow');
	for(i=0;i<=(userInput/5)-1;i++){
		ut[i].style.margin = "0px 0px 0px " + (body.clientWidth/2 - 326/2) + "px";
	}
	var lt = document.getElementsByClassName('lrow');
	lt[0].style.margin = "0px 0px 0px " + (body.clientWidth/2 - (64*(userInput%5))/2) + "px";
	faces = document.getElementsByClassName('rotating-face');	// get all the faces
	initializeImages();	// initially all the images are looking upwards
}

// call this function as soon as the document loads
window.addEventListener('load', doFirst,false);
