list = 'google-10000-english-usa-no-swears-medium.txt'

output = 'out.txt'

listF = open(list,'r')
outF = open(output,'w')

outF.write('[')

for line in listF:
	outF.write('\'' + line[:-1] + '\',')

outF.write(']')